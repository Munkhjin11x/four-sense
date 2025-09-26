import { getDatabase } from "@/lib/db";
import { Orders, OrderSeats, TableSeats } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const db = getDatabase();

  try {
    const body = await req.json();
    const { orderId } = body as { orderId: number };

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    // Check if order exists and get its current status
    const order = await db
      .select()
      .from(Orders)
      .where(eq(Orders.id, orderId))
      .limit(1);

    if (order.length === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order[0].status === "cancelled") {
      return NextResponse.json(
        { error: "Order is already cancelled" },
        { status: 400 }
      );
    }

    // Get the seats associated with this order
    const orderSeats = await db
      .select({ seatId: OrderSeats.seatId })
      .from(OrderSeats)
      .where(eq(OrderSeats.orderId, orderId));

    // Start a transaction to cancel order and free up seats
    await db.batch([
      // Update order status to cancelled
      db
        .update(Orders)
        .set({ status: "cancelled" })
        .where(eq(Orders.id, orderId)),

      // Set all associated seats back to available
      ...orderSeats.map(({ seatId }) =>
        db
          .update(TableSeats)
          .set({ status: "available" })
          .where(eq(TableSeats.id, seatId))
      ),
    ]);

    return NextResponse.json({
      success: true,
      message: "Order cancelled successfully",
      orderId: orderId,
    });
  } catch (error) {
    console.error("Error cancelling order:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
