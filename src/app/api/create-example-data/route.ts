import { getDatabase } from "@/lib/db";

import { createTable, createTableSeat } from "@/lib/table-service";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const db = getDatabase();

    const tableC1 = await createTable(db, "c3");

    const c1Seats = [];
    for (let i = 1; i <= 3; i++) {
      const seat = await createTableSeat(
        db,
        tableC1.id,
        "c3",
        `Seat ${i}`,
        "available"
      );
      c1Seats.push(seat);
    }

    return NextResponse.json({
      success: true,
      message: "Example data created successfully!",
      data: {
        tableC1,
        c1Seats,
      },
    });
  } catch (error) {
    console.error("Error creating example data:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create example data",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
