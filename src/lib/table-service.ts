import { getDatabase } from "@/lib/db";
import { Tables, TableSeats } from "@/db/schema";
import { eq } from "drizzle-orm";

export const createTable = async (
  db: ReturnType<typeof getDatabase>,
  tableName: string
) => {
  const [table] = await db.insert(Tables).values({ tableName }).returning();
  return table;
};

export const deleteTable = async (
  db: ReturnType<typeof getDatabase>,
  id: number
) => {
  await db.delete(Tables).where(eq(Tables.id, id));
  return { message: "Table deleted" };
};

export const getTables = async (db: ReturnType<typeof getDatabase>) => {
  const tables = await db.select().from(Tables);
  return tables;
};

export const getTableSeats = async (
  db: ReturnType<typeof getDatabase>,
  tableId: number
) => {
  const seats = await db
    .select()
    .from(TableSeats)
    .where(eq(TableSeats.tableId, tableId));
  return seats;
};

export const createTableSeat = async (
  db: ReturnType<typeof getDatabase>,
  tableId: number,
  tableName: string,
  title: string,
  status: "available" | "ordered"
) => {
  const [seat] = await db
    .insert(TableSeats)
    .values({ tableId, tableName, title, status })
    .returning();
  return seat;
};

export const deleteTableSeat = async (
  db: ReturnType<typeof getDatabase>,
  id: number
) => {
  await db.delete(TableSeats).where(eq(TableSeats.id, id));
  return { message: "Table seat deleted" };
};

export const updateTableSeatStatus = async (
  db: ReturnType<typeof getDatabase>,
  seatId: number,
  status: "available" | "ordered"
) => {
  const [updatedSeat] = await db
    .update(TableSeats)
    .set({ status })
    .where(eq(TableSeats.id, seatId))
    .returning();
  return updatedSeat;
};
