/*
 * Apply pending SQL migrations in lexical order, each in a transaction, tracking
 * applied filenames in a schema_migrations table. Idempotent — safe to re-run.
 * Usage:  DATABASE_URL='postgres://...' npm run migrate
 */
import postgres from "postgres";
import { readdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "migrations");
const sql = postgres(process.env.DATABASE_URL, { ssl: "require", prepare: false });

try {
  await sql`create table if not exists schema_migrations (
    filename text primary key,
    applied_at timestamptz not null default now()
  )`;

  const applied = new Set((await sql`select filename from schema_migrations`).map((r) => r.filename));
  const files = (await readdir(dir)).filter((f) => f.endsWith(".sql")).sort();

  let count = 0;
  for (const file of files) {
    if (applied.has(file)) continue;
    const text = await readFile(join(dir, file), "utf8");
    console.log(`Applying ${file}…`);
    await sql.begin(async (tx) => {
      await tx.unsafe(text);
      await tx`insert into schema_migrations (filename) values (${file})`;
    });
    count++;
  }
  console.log(count ? `Applied ${count} migration(s).` : "No pending migrations.");
} catch (e) {
  console.error("Migration failed:", e);
  process.exitCode = 1;
} finally {
  await sql.end();
}
