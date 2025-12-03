import { createOrderWithSeats } from "@/store/db";
import { getDatabase } from "@/lib/db";
import { Orders, Tables, OrderSeats, TableSeats } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq, desc } from "drizzle-orm";

interface CreateOrderRequest {
  name: string;
  phone: string;
  email: string;
  tableName: string;
  seatIds: (string | number)[];
  tableId?: number;
  date?: string;
  turnstileToken: string;
  eventDate: number;
}

// Function to verify Cloudflare Turnstile token
async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secretKey = "0x4AAAAAAB4B7L7MLAYEkwhW-UciGiMs8_Q"; // Your secret key from the component

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secretKey}&response=${token}`,
    }
  );

  const data = (await response.json()) as { success: boolean };
  return data.success === true;
}

export async function POST(req: Request) {
  const db = getDatabase();
  try {
    const body = await req.json();
    const {
      name,
      phone,
      email,
      tableName,
      seatIds,
      tableId,
      date,
      turnstileToken,
      eventDate,
    } = body as CreateOrderRequest;

    if (!turnstileToken) {
      return NextResponse.json(
        { error: "CAPTCHA token is required" },
        { status: 400 }
      );
    }

    const isTurnstileValid = await verifyTurnstileToken(turnstileToken);
    if (!isTurnstileValid) {
      return NextResponse.json(
        { error: "CAPTCHA verification failed. Please try again." },
        { status: 400 }
      );
    }

    let formattedDate;
    if (date) {
      const parsedDate = new Date(date);

      formattedDate = parsedDate
        .toISOString()
        .replace("T", " ")
        .substring(0, 19);
    } else {
      formattedDate = new Date()
        .toISOString()
        .replace("T", " ")
        .substring(0, 19);
    }

    const processedSeatIds = seatIds.map((seatId: string | number) => {
      if (typeof seatId === "string" && seatId.includes("seat_")) {
        const parts = seatId.split("_");
        return parseInt(parts[1], 10);
      }
      return typeof seatId === "string" ? parseInt(seatId, 10) : seatId;
    });

    let processedTableId = tableId;
    if (!processedTableId) {
      const tableRecord = await db
        .select()
        .from(Tables)
        .where(eq(Tables.tableName, tableName))
        .limit(1);

      if (tableRecord.length > 0) {
        processedTableId = tableRecord[0].id;
      } else {
        throw new Error(`Table ${tableName} not found`);
      }
    }

    const order = await createOrderWithSeats(db, {
      name,
      phone,
      email,
      tableName,
      seatIds: processedSeatIds,
      tableId: processedTableId,
      date: formattedDate,
      eventDate,
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creating order:", error);

    // Handle duplicate order error specifically
    if (
      error instanceof Error &&
      error.message.includes(
        "You can only order with this name and phone number after 3 hours"
      )
    ) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const db = getDatabase();
  const url = new URL(request.url);

  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "10");

  const validPage = Math.max(1, page);
  const validLimit = Math.min(Math.max(1, limit), 100);

  const offset = (validPage - 1) * validLimit;

  try {
    // Get total count - simple approach
    const allOrders = await db.select().from(Orders);
    const total = allOrders.length;

    // Calculate total unique customers (by email)
    const uniqueEmails = new Set(allOrders.map((order) => order.email));
    const totalCustomers = uniqueEmails.size;

    const orders = await db
      .select()
      .from(Orders)
      .orderBy(desc(Orders.orderDate))
      .limit(validLimit)
      .offset(offset);

    const ordersWithSeats = await Promise.all(
      orders.map(async (order) => {
        const seats = await db
          .select()
          .from(OrderSeats)
          .innerJoin(TableSeats, eq(OrderSeats.seatId, TableSeats.id))
          .where(eq(OrderSeats.orderId, order.id));

        return {
          ...order,
          seats,
        };
      })
    );

    const totalPages = Math.ceil(total / validLimit);
    const hasNext = validPage < totalPages;
    const hasPrev = validPage > 1;

    return NextResponse.json({
      orders: ordersWithSeats,
      pagination: {
        currentPage: validPage,
        totalPages,
        total,
        totalCustomers,
        limit: validLimit,
        hasNext,
        hasPrev,
      },
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
