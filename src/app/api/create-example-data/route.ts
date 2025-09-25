import { getDb } from "@/lib/db";

import { createTable, createTableSeat } from "@/lib/table-service";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const db = getDb();

    // Create c1 table with 6 seats
    console.log("Creating table 'a1'...");
    const tableC1 = await createTable(db, "c3");
    console.log("Created table c1:", tableC1);

    console.log("Creating 3 seats for table c1...");
    const c1Seats = [];
    for (let i = 1; i <= 3; i++) {
      const seat = await createTableSeat(
        db,
        tableC1.id,
        "a3",
        `Seat ${i}`,
        "ordered"
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
