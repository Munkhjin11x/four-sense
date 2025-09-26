import { getDatabase } from "@/lib/db";
import { Orders } from "@/db/schema";
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

    if (order[0].status === "approved") {
      return NextResponse.json(
        { error: "Order is already approved" },
        { status: 400 }
      );
    }

    if (order[0].status === "cancelled") {
      return NextResponse.json(
        { error: "Cannot approve a cancelled order" },
        { status: 400 }
      );
    }

    // Update order status to approved
    await db
      .update(Orders)
      .set({ status: "approved" })
      .where(eq(Orders.id, orderId));

    return NextResponse.json({
      success: true,
      message: "Order approved successfully",
      orderId: orderId,
    });
  } catch (error) {
    console.error("Error approving order:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
