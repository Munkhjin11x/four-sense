import { Database } from "@/db";
import { Tables, TableSeats } from "@/db/schema";
import { eq } from "drizzle-orm";

export const createTable = async (db: Database, tableName: string) => {
  const [table] = await db.insert(Tables).values({ tableName }).returning();
  return table;
};

export const deleteTable = async (db: Database, id: number) => {
  await db.delete(Tables).where(eq(Tables.id, id));
  return { message: "Table deleted" };
};

export const getTables = async (db: Database) => {
  const tables = await db.select().from(Tables);
  return tables;
};

export const getTableSeats = async (db: Database, tableId: number) => {
  const seats = await db
    .select()
    .from(TableSeats)
    .where(eq(TableSeats.tableId, tableId));
  return seats;
};

export const createTableSeat = async (
  db: Database,
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

export const deleteTableSeat = async (db: Database, id: number) => {
  await db.delete(TableSeats).where(eq(TableSeats.id, id));
  return { message: "Table seat deleted" };
};

export const updateTableSeatStatus = async (
  db: Database,
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
