import { getDatabase } from "@/lib/db";
import { TableSeats } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq, and, inArray } from "drizzle-orm";

export async function PUT(req: Request) {
  const db = getDatabase();

  try {
    const { tableName, seatIds } = await req.json();

    if (!tableName || !seatIds || !Array.isArray(seatIds)) {
      return NextResponse.json(
        {
          error:
            "Invalid request data. tableName and seatIds array are required.",
        },
        { status: 400 }
      );
    }

    // Convert MongoDB-style seat IDs to integers if needed
    const processedSeatIds = seatIds.map((seatId: string) => {
      if (typeof seatId === "string" && seatId.includes("seat_")) {
        // Extract the integer ID from "seat_9_mfxvy5lh" format
        const parts = seatId.split("_");
        return parseInt(parts[1], 10);
      }
      return parseInt(seatId, 10);
    });

    // Find seats that belong to the specified table and have the given IDs
    const seatsToUpdate = await db
      .select()
      .from(TableSeats)
      .where(
        and(
          eq(TableSeats.tableName, tableName),
          inArray(TableSeats.id, processedSeatIds)
        )
      );

    if (seatsToUpdate.length === 0) {
      return NextResponse.json(
        { error: "No seats found for the given criteria." },
        { status: 404 }
      );
    }

    // Update each seat's status from "ordered" to "available"
    // (Only seats with "ordered" status should be updated)
    const updatePromises = seatsToUpdate
      .filter((seat) => seat.status === "ordered")
      .map((seat) =>
        db
          .update(TableSeats)
          .set({ status: "available" })
          .where(eq(TableSeats.id, seat.id))
      );

    await Promise.all(updatePromises);

    const updatedCount = updatePromises.length;

    return NextResponse.json({
      message: `Successfully updated ${updatedCount} seat(s) to available status`,
      updatedCount,
    });
  } catch (error) {
    console.error("Error updating seat status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
