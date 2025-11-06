import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "hdz2jpzn",
  dataset: "production",
  apiVersion: "2025-11-02",
  useCdn: process.env.NODE_ENV === "production",
  token:
    "skoRuPxoH5sCATshMnCa2yOkNHNd0llG8ucF23grPdH0cLSRuv7y1dP4Qj6WvkPqZ4G6lnB13ZTwMtWugSdi3u187BtOtvkCJamvxDk0q21aHrQhzS8KZDagmixeFibPfMzoA7dgqK0Pgb4xGfavpQwTNgm93A6j5Bq33aKLnMA4dtGWvTPJ", // Required for private datasets
});
