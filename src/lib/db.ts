import { drizzle } from "drizzle-orm/d1";
import * as schema from "@/db/schema";

interface D1Database {
  prepare(query: string): unknown;
  exec(query: string): Promise<unknown>;
  batch(statements: unknown[]): Promise<unknown[]>;
  dump(): Promise<ArrayBuffer>;
}

let db: ReturnType<typeof drizzle> | null = null;

export function getDatabase(
  d1Database?: D1Database
): NonNullable<ReturnType<typeof drizzle>> {
  if (!db) {
    if (process.env.NODE_ENV === "development" || !d1Database) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const Database = require("better-sqlite3");
      const sqlite = new Database("dev.db");
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { drizzle: drizzleSqlite } = require("drizzle-orm/better-sqlite3");
      db = drizzleSqlite(sqlite, { schema });
    } else {
      // Production: use D1
      db = drizzle(d1Database, { schema });
    }
  }

  if (!db) {
    throw new Error("Failed to initialize database connection");
  }

  return db;
}

// For Next.js Edge Runtime and Cloudflare Workers
export function createD1Database(env: { DB?: D1Database }) {
  if (env?.DB) {
    return drizzle(env.DB, { schema });
  }

  // Fallback to development database
  return getDatabase();
}

export type Database = NonNullable<ReturnType<typeof getDatabase>>;
export * from "@/db/schema";

import { and, gte, eq } from "drizzle-orm";
import { Orders } from "@/db/schema";

export async function checkOrderEligibility(
  db: Database,
  orderData: { name: string; phone: string; email: string }
) {
  const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);

  const threeHoursAgoSQLite = threeHoursAgo
    .toISOString()
    .replace("T", " ")
    .substring(0, 19);

  const existingOrder = await db
    .select()
    .from(Orders)
    .where(
      and(
        eq(Orders.name, orderData.name),
        eq(Orders.phone, orderData.phone),
        eq(Orders.email, orderData.email),
        gte(Orders.orderDate, threeHoursAgoSQLite)
      )
    )
    .limit(1);

  if (existingOrder.length > 0) {
    throw new Error(
      "You can only order with this name and phone number after 3 hours."
    );
  }
}

export async function createOrderWithSeats(
  db: Database,
  orderData: {
    tableId: number;
    tableName: string;
    name: string;
    phone: string;
    email: string;
    seatIds: number[];
    date: string;
  }
) {
  // Check eligibility first
  await checkOrderEligibility(db, orderData);

  // Begin transaction
  return await db.transaction(async (tx) => {
    // Create the order
    const [order] = await tx
      .insert(Orders)
      .values({
        tableId: orderData.tableId,
        tableName: orderData.tableName,
        name: orderData.name,
        phone: orderData.phone,
        email: orderData.email,
        orderDate: orderData.date,
      })
      .returning();

    // Create order-seat associations
    const { OrderSeats, TableSeats } = schema;
    if (orderData.seatIds.length > 0) {
      await tx.insert(OrderSeats).values(
        orderData.seatIds.map((seatId) => ({
          orderId: order.id,
          seatId: seatId,
        }))
      );

      // Update seat statuses to "ordered"
      for (const seatId of orderData.seatIds) {
        await tx
          .update(TableSeats)
          .set({ status: "ordered" })
          .where(eq(TableSeats.id, seatId));
      }
    }

    return order;
  });
}
