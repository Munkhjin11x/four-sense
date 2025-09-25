import path from "node:path";
import { defineConfig } from "drizzle-kit";

function getLocalD1DB() {
  // Use a simple local sqlite file for development
  const localDbPath = path.resolve("dev.db");
  return localDbPath;
}

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  ...(process.env.NODE_ENV === "production"
    ? {
        driver: "d1-http",
        dbCredentials: {
          accountId: "544971d734e2d2605d77624f56f6e72d",
          databaseId: "1ac8c424-7722-4894-92e6-6473bf090abc",
          token: "R3gt_08buDUu-Tyd6yq5M6XtcmgIryStylNAc-wx",
        },
      }
    : {
        dbCredentials: {
          url: getLocalD1DB(),
        },
      }),
});
