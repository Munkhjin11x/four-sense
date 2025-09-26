import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";

export const AdminUsers = sqliteTable("AdminUsers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const Tables = sqliteTable("Tables", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  tableName: text("table_name").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const TableSeats = sqliteTable("TableSeats", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  tableId: integer("table_id")
    .notNull()
    .references(() => Tables.id, { onDelete: "cascade" }),
  tableName: text("table_name").notNull(),
  title: text("title").notNull(),
  status: text("status", { enum: ["available", "ordered"] })
    .notNull()
    .default("available"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const Orders = sqliteTable("Orders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  tableId: integer("table_id")
    .notNull()
    .references(() => Tables.id, { onDelete: "cascade" }),
  tableName: text("table_name").notNull(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  orderDate: text("order_date").notNull(),
  status: text("status", { enum: ["pending", "approved", "cancelled"] })
    .notNull()
    .default("pending"),
});

export const OrderSeats = sqliteTable("OrderSeats", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  orderId: integer("order_id")
    .notNull()
    .references(() => Orders.id, { onDelete: "cascade" }),
  seatId: integer("seat_id")
    .notNull()
    .references(() => TableSeats.id, { onDelete: "cascade" }),
});

export const tablesRelations = relations(Tables, ({ many }) => ({
  seats: many(TableSeats),
  orders: many(Orders),
}));

export const tableSeatsRelations = relations(TableSeats, ({ one, many }) => ({
  table: one(Tables, {
    fields: [TableSeats.tableId],
    references: [Tables.id],
  }),
  orderSeats: many(OrderSeats),
}));

export const ordersRelations = relations(Orders, ({ one, many }) => ({
  table: one(Tables, {
    fields: [Orders.tableId],
    references: [Tables.id],
  }),
  orderSeats: many(OrderSeats),
}));

export const orderSeatsRelations = relations(OrderSeats, ({ one }) => ({
  order: one(Orders, {
    fields: [OrderSeats.orderId],
    references: [Orders.id],
  }),
  seat: one(TableSeats, {
    fields: [OrderSeats.seatId],
    references: [TableSeats.id],
  }),
}));
