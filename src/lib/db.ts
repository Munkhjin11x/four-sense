import { drizzle } from "drizzle-orm/d1";
import { drizzle as drizzleLocal } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { cache } from "react";
import * as schema from "@/db/schema";
import path from "path";
import { env } from "process";

export const getDatabase = cache(() => {
  if (process.env.NODE_ENV !== "production") {
    const dbPath = path.join(process.cwd(), "dev.db");
    const sqlite = new Database(dbPath);
    return drizzleLocal(sqlite, { schema });
  }

  return drizzle(env.DB, { schema });
});
