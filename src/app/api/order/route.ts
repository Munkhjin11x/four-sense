import { createOrderWithSeats } from "@/store/db";
import { getDb } from "@/lib/db";
import { Orders, Tables, OrderSeats, TableSeats } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq, desc, count } from "drizzle-orm";

export async function POST(req: Request) {
  const db = getDb();
  try {
    const { name, phone, email, tableName, seatIds, tableId, date } =
      await req.json();

    // Debug: Log the received date
    console.log("Received date:", date, typeof date);

    // Format date for SQLite (convert from ISO string to SQLite datetime format)
    let formattedDate;
    if (date) {
      const parsedDate = new Date(date);
      console.log("Parsed date:", parsedDate);
      formattedDate = parsedDate
        .toISOString()
        .replace("T", " ")
        .substring(0, 19);
    } else {
      console.log("No date provided, using current timestamp");
      formattedDate = new Date()
        .toISOString()
        .replace("T", " ")
        .substring(0, 19);
    }

    console.log("Formatted date for SQLite:", formattedDate);

    // Convert MongoDB-style seat IDs to integers
    const processedSeatIds = seatIds.map((seatId: string | number) => {
      if (typeof seatId === "string" && seatId.includes("seat_")) {
        // Extract the integer ID from "seat_9_mfxvy5lh" format
        const parts = seatId.split("_");
        return parseInt(parts[1], 10);
      }
      return typeof seatId === "string" ? parseInt(seatId, 10) : seatId;
    });

    // Find tableId by tableName if not provided
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
  const db = getDb();
  const url = new URL(request.url);

  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "10");

  const validPage = Math.max(1, page);
  const validLimit = Math.min(Math.max(1, limit), 100);

  const offset = (validPage - 1) * validLimit;

  try {
    // Get total count
    const [totalResult] = await db.select({ count: count() }).from(Orders);
    const total = totalResult.count;

    const orders = await db
      .select({
        id: Orders.id,
        tableId: Orders.tableId,
        tableName: Orders.tableName,
        name: Orders.name,
        phone: Orders.phone,
        email: Orders.email,
        orderDate: Orders.orderDate,
      })
      .from(Orders)
      .orderBy(desc(Orders.orderDate))
      .limit(validLimit)
      .offset(offset);

    const ordersWithSeats = await Promise.all(
      orders.map(async (order) => {
        const seats = await db
          .select({
            id: TableSeats.id,
            title: TableSeats.title,
            status: TableSeats.status,
          })
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
