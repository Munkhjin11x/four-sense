import { Orders } from "@/db/schema";
import { Database } from "@/db";
import { and, eq, gte } from "drizzle-orm";
import * as schema from "@/db/schema";
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

    const { OrderSeats, TableSeats } = schema;
    if (orderData.seatIds.length > 0) {
      await tx.insert(OrderSeats).values(
        orderData.seatIds.map((seatId) => ({
          orderId: order.id,
          seatId: seatId,
        }))
      );

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
