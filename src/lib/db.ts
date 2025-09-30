import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";
import { drizzle as drizzleBetterSqlite } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { cache } from "react";
import * as schema from "@/db/schema";
import path from "node:path";
import * as fs from "node:fs";

function getLocalD1DB() {
  try {
    const basePath = path.resolve(".wrangler");
    const dbFile = fs
      .readdirSync(basePath, { encoding: "utf-8", recursive: true })
      .find((f) => f.endsWith(".sqlite"));

    if (!dbFile) {
      throw new Error(".sqlite file not found");
    }

    const url = path.resolve(basePath, dbFile);
    return url;
  } catch (e) {
    console.error(`Error finding local database: ${e}`);
    // Fallback to a default path
    return path.resolve("dev.db");
  }
}

function isCloudflareEnvironment() {
  return (
    (typeof process !== "undefined" && process.env.NODE_ENV === "production") ||
    (typeof globalThis !== "undefined" && "DB" in globalThis)
  );
}

export const getDatabase = cache(() => {
  if (isCloudflareEnvironment()) {
    try {
      const { env } = getCloudflareContext();
      return drizzle(env.DB, { schema });
    } catch (error) {
      console.error(
        "Failed to get Cloudflare context, falling back to local database:",
        error
      );
    }
  }

  // Use local SQLite database for development
  const dbPath = getLocalD1DB();
  const sqlite = new Database(dbPath);
  return drizzleBetterSqlite(sqlite, { schema });
});

export const getDbAsync = cache(async () => {
  if (isCloudflareEnvironment()) {
    try {
      const { env } = await getCloudflareContext({ async: true });
      return drizzle(env.DB, { schema });
    } catch (error) {
      console.error(
        "Failed to get Cloudflare context async, falling back to local database:",
        error
      );
    }
  }

  // Use local SQLite database for development
  const dbPath = getLocalD1DB();
  const sqlite = new Database(dbPath);
  return drizzleBetterSqlite(sqlite, { schema });
});
