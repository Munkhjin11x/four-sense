export interface Env {
  // Cloudflare D1 Database binding
  DB: D1Database;

  // Add other Cloudflare bindings here as needed
  // KV: KVNamespace;
  // R2: R2Bucket;
  // ASSETS: Fetcher;
}

// Extend global type definitions for Cloudflare environment
declare global {
  interface CloudflareEnv extends Env {}
}
