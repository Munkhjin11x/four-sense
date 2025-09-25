import { NextResponse } from "next/server";
import { AdminUsers } from "@/db/schema";
import { getDatabase } from "@/lib/db";
import { eq } from "drizzle-orm";
import crypto from "crypto";

interface LoginRequest {
  username: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body as LoginRequest;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Missing username or password" },
        { status: 400 }
      );
    }

    const db = getDatabase();

    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    const user = await db
      .select()
      .from(AdminUsers)
      .where(eq(AdminUsers.email, username))
      .limit(1);

    if (user.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    if (user[0].password !== hashedPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    return NextResponse.json({
      message: "Login successful",
      userId: user[0].id.toString(),
      email: user[0].email,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
