import { client } from "@/lib/sanity/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { query?: string };

    if (!body.query || typeof body.query !== "string") {
      return NextResponse.json(
        { error: "Query parameter is required" },
        { status: 400 }
      );
    }

    const query = body.query;

    const data = await client.fetch(query);

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("Sanity API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from Sanity" },
      { status: 500 }
    );
  }
}
