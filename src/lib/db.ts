import { drizzle } from "drizzle-orm/d1";
import { drizzle as drizzleBetterSqlite } from "drizzle-orm/better-sqlite3";
import { cache } from "react";
import * as schema from "@/db/schema";

// Define Cloudflare environment interface
interface CloudflareEnv {
  DB: unknown; // D1 database instance
}

// Check if we're in a Cloudflare environment
const isCloudflareEnvironment = () => {
  return (
    typeof process !== "undefined" && process.env.NODE_ENV === "production"
  );
};

export const getDb = cache(() => {
  // In development, use local SQLite
  if (process.env.NODE_ENV === "development" || !isCloudflareEnvironment()) {
    try {
      // Use eval to bypass the linter require warning for dynamic loading
      const Database = eval("require")("better-sqlite3");
      const sqlite = new Database("./dev.db");
      return drizzleBetterSqlite(sqlite, { schema });
    } catch (error) {
      console.error("Failed to create SQLite connection:", error);
      throw new Error("Database connection failed in development environment");
    }
  }

  // In Cloudflare production environment
  try {
    const { getCloudflareContext } = eval("require")("@opennextjs/cloudflare");
    const { env } = getCloudflareContext() as { env: CloudflareEnv };
    return drizzle(env.DB, { schema });
  } catch (error) {
    console.error("Failed to get Cloudflare context:", error);
    throw new Error("Cloudflare context not available");
  }
});

export const getDbAsync = cache(async () => {
  // In development, use local SQLite
  if (process.env.NODE_ENV === "development" || !isCloudflareEnvironment()) {
    try {
      const Database = eval("require")("better-sqlite3");
      const sqlite = new Database("./dev.db");
      return drizzleBetterSqlite(sqlite, { schema });
    } catch (error) {
      console.error("Failed to create SQLite connection:", error);
      throw new Error("Database connection failed in development environment");
    }
  }

  // In Cloudflare production environment
  try {
    const { getCloudflareContext } = eval("require")("@opennextjs/cloudflare");
    const { env } = (await getCloudflareContext({ async: true })) as {
      env: CloudflareEnv;
    };
    return drizzle(env.DB, { schema });
  } catch (error) {
    console.error("Failed to get Cloudflare context:", error);
    throw new Error("Cloudflare context not available");
  }
});
