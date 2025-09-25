import { getDatabase } from "@/lib/db";
import { Tables, TableSeats } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

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

export async function GET() {
  try {
    const db = getDatabase();
    const tables = await db.select().from(Tables);

    const tablesWithSeats = await Promise.all(
      tables.map(async (table) => {
        const seats = await db
          .select()
          .from(TableSeats)
          .where(eq(TableSeats.tableId, table.id));

        return {
          _id: { $oid: `table_${table.id}_${Date.now().toString(36)}` },
          tableId: { $oid: `table_${table.id}_${Date.now().toString(36)}` },
          tableName: table.tableName,
          seats: seats.map((seat) => ({
            title: seat.title,
            status: seat.status,
            _id: { $oid: `seat_${seat.id}_${Date.now().toString(36)}` },
          })),
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
