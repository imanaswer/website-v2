import postgres from "postgres";

/*
 * Supabase Postgres client (postgres.js). `sql` is a tagged-template query
 * function:  const rows = await sql`select * from news where id = ${id}`;
 *
 * Use the Supabase "Connection pooling" string (Transaction mode, port 6543)
 * as DATABASE_URL — it suits short-lived serverless functions. `prepare: false`
 * is required because the transaction pooler doesn't support prepared
 * statements.
 */
if (!process.env.DATABASE_URL) {
  console.warn("DATABASE_URL is not set — database queries will fail until it is configured.");
}

export const sql = postgres(process.env.DATABASE_URL || "", {
  ssl: "require",
  prepare: false,
  idle_timeout: 20,
  max: 1,
});
