import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  dialect: "sqlite",
  driver: "d1-http",
  out: "./drizzle",
  dbCredentials: {
    accountId: "544971d734e2d2605d77624f56f6e72d",
    databaseId: "1ac8c424-7722-4894-92e6-6473bf090abc",
    token: "khe_QSpOk3iz1DgibXC9eu7dRfqhZfIKaL6ogNoy",
  },
});
