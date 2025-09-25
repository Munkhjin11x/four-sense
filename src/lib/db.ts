/* eslint-disable @typescript-eslint/no-require-imports */
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
    if (process.env.NODE_ENV === "development") {
      // Development: use better-sqlite3 with local db file
      try {
        const Database = require("better-sqlite3");
        const sqlite = new Database("dev.db");

        const {
          drizzle: drizzleSqlite,
        } = require("drizzle-orm/better-sqlite3");
        db = drizzleSqlite(sqlite, { schema });
      } catch (error) {
        console.error("Failed to initialize development database:", error);
        throw new Error("Development database initialization failed");
      }
    } else if (d1Database) {
      // Cloudflare Workers/Pages: use D1 binding
      db = drizzle(d1Database, { schema });
    } else {
      // For Vercel deployment: use SQLite in-memory fallback
      // This requires the admin user to be pre-seeded
      try {
        const Database = require("better-sqlite3");
        const sqlite = new Database(":memory:");

        const {
          drizzle: drizzleSqlite,
        } = require("drizzle-orm/better-sqlite3");
        db = drizzleSqlite(sqlite, { schema });

        // Create the AdminUsers table and seed it
        sqlite.exec(`
          CREATE TABLE IF NOT EXISTS AdminUsers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
          );
        `);

        // Create other tables for basic functionality
        sqlite.exec(`
          CREATE TABLE IF NOT EXISTS Tables (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            table_name TEXT NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
          );
        `);

        sqlite.exec(`
          CREATE TABLE IF NOT EXISTS TableSeats (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            table_id INTEGER NOT NULL REFERENCES Tables(id) ON DELETE CASCADE,
            table_name TEXT NOT NULL,
            title TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'available',
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
          );
        `);

        sqlite.exec(`
          CREATE TABLE IF NOT EXISTS Orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            table_id INTEGER NOT NULL REFERENCES Tables(id) ON DELETE CASCADE,
            table_name TEXT NOT NULL,
            name TEXT NOT NULL,
            phone TEXT NOT NULL,
            email TEXT NOT NULL,
            order_date TEXT NOT NULL
          );
        `);

        sqlite.exec(`
          CREATE TABLE IF NOT EXISTS OrderSeats (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_id INTEGER NOT NULL REFERENCES Orders(id) ON DELETE CASCADE,
            seat_id INTEGER NOT NULL REFERENCES TableSeats(id) ON DELETE CASCADE
          );
        `);

        // Insert the admin user (password is SHA256 hash of "admin123")
        const adminPassword =
          "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9";
        sqlite.exec(`
          INSERT OR IGNORE INTO AdminUsers (email, password) 
          VALUES ('admin@foursenses.com', '${adminPassword}');
        `);

        console.log("Initialized in-memory database with admin user");
      } catch (error) {
        console.error("Failed to initialize in-memory database:", error);
        throw new Error("Database initialization failed");
      }
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
