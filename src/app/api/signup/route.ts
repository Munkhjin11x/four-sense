import { NextResponse } from "next/server";
import { AdminUsers } from "@/db/schema";
import { getDatabase } from "@/lib/db";
import { eq } from "drizzle-orm";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing email or password" },
        { status: 400 }
      );
    }

    // Get database connection
    const db = getDatabase();

    // Check if user already exists
    const existingUser = await db
      .select()
      .from(AdminUsers)
      .where(eq(AdminUsers.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password properly
    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    // Insert new user
    const result = await db.insert(AdminUsers).values({
      email,
      password: hashedPassword,
    });

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      user: result[0],
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
