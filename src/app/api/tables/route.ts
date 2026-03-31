import { getDatabase } from "@/lib/db";
import { Tables, TableSeats, Orders, OrderSeats } from "@/db/schema";
import { NextResponse } from "next/server";
import { and, eq, like, ne } from "drizzle-orm";

interface CreateTableRequest {
  tableName: string;
}

interface DeleteTableRequest {
  id: number;
}

interface UpdateTableRequest {
  id: number;
  tableName: string;
}

function getMongoliaDateString(date?: string): string {
  const d = date ? new Date(date) : new Date();
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Ulaanbaatar",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(d); // Returns "YYYY-MM-DD"
}

export async function GET(request: Request) {
  try {
    const db = getDatabase();
    const url = new URL(request.url);
    const dateParam = url.searchParams.get("date");

    // Resolve the target date in Mongolia timezone (YYYY-MM-DD)
    const targetDate = getMongoliaDateString(dateParam ?? undefined);

    const tables = await db.select().from(Tables);

    const tablesWithSeats = await Promise.all(
      tables.map(async (table) => {
        const seats = await db
          .select()
          .from(TableSeats)
          .where(eq(TableSeats.tableId, table.id));

        const seatsWithDateStatus = await Promise.all(
          seats.map(async (seat) => {
            // A seat is "ordered" for targetDate if there is at least one
            // non-cancelled order whose orderDate starts with targetDate.
            const bookedRows = await db
              .select()
              .from(OrderSeats)
              .innerJoin(Orders, eq(OrderSeats.orderId, Orders.id))
              .where(
                and(
                  eq(OrderSeats.seatId, seat.id),
                  ne(Orders.status, "cancelled"),
                  like(Orders.orderDate, `${targetDate}%`)
                )
              )
              .limit(1);

            return {
              title: seat.title,
              status: bookedRows.length > 0 ? "ordered" : "available",
              _id: { $oid: `seat_${seat.id}_${Date.now().toString(36)}` },
            };
          })
        );

        return {
          _id: { $oid: `table_${table.id}_${Date.now().toString(36)}` },
          tableId: { $oid: `table_${table.id}_${Date.now().toString(36)}` },
          tableName: table.tableName,
          seats: seatsWithDateStatus,
          __v: { $numberInt: "0" },
        };
      })
    );

    return NextResponse.json(tablesWithSeats);
  } catch (error) {
    console.error("Error in GET /api/tables:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
export async function POST(req: Request) {
  const db = getDatabase();
  const body = await req.json();
  const { tableName } = body as CreateTableRequest;
  const table = await db.insert(Tables).values({ tableName });
  return NextResponse.json(table);
}
export async function DELETE(req: Request) {
  const db = getDatabase();
  const body = await req.json();
  const { id } = body as DeleteTableRequest;
  await db.delete(Tables).where(eq(Tables.id, id));
  return NextResponse.json({ message: "Table deleted" });
}

export async function PUT(req: Request) {
  const db = getDatabase();
  const body = await req.json();
  const { id, tableName } = body as UpdateTableRequest;
  await db.update(Tables).set({ tableName }).where(eq(Tables.id, id));
  return NextResponse.json({ message: "Table updated" });
}
