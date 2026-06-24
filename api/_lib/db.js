import { neon } from "@neondatabase/serverless";

/*
 * Neon Postgres client. `sql` is a tagged-template query function that runs
 * over HTTP, which works inside Vercel serverless functions.
 *   const rows = await sql`select * from news where id = ${id}`;
 */
if (!process.env.DATABASE_URL) {
  console.warn("DATABASE_URL is not set — database queries will fail until it is configured.");
}

export const sql = neon(process.env.DATABASE_URL || "");
