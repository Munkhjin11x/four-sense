/* eslint-disable @typescript-eslint/no-require-imports */
import { drizzle } from "drizzle-orm/d1";
import { drizzle as drizzleLocal } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { cache } from "react";
import * as schema from "@/db/schema";
import path from "path";

interface D1DatabaseBinding {
  // Minimal shape to satisfy typings
  prepare: (query: string) => unknown;
}

function resolveCloudflareD1Binding(): unknown {
  // Attempt to read from Next.js request context (Edge runtime)
  try {
    const { getRequestContext } = require("next/server");
    const ctx = getRequestContext?.();
    if (ctx?.env?.DB) return ctx.env.DB;
  } catch {
    // getRequestContext not available
  }

  // Last resort: some runtimes may attach bindings on a global object
  const anyGlobal = globalThis as unknown as {
    __ENV__?: { DB?: unknown };
    env?: { DB?: unknown };
  };
  if (anyGlobal?.env?.DB) return anyGlobal.env.DB;
  if (anyGlobal?.__ENV__?.DB) return anyGlobal.__ENV__.DB;

  throw new Error("Cloudflare D1 binding not found in production environment");
}

export const getDatabase = cache(() => {
  if (process.env.NODE_ENV !== "production") {
    const dbPath = path.join(process.cwd(), "dev.db");
    const sqlite = new Database(dbPath);
    return drizzleLocal(sqlite, { schema });
  }

  const d1 = resolveCloudflareD1Binding();
  return drizzle(d1 as unknown as D1DatabaseBinding, { schema });
});
