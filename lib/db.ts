import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var promosTreinoPool: Pool | undefined;
}

export function hasDatabaseConfig() {
  return Boolean(process.env.DATABASE_URL || process.env.PGDATABASE);
}

export function getPool() {
  if (!hasDatabaseConfig()) {
    throw new Error("Database connection is not configured. Set DATABASE_URL or PGDATABASE.");
  }

  if (!globalThis.promosTreinoPool) {
    globalThis.promosTreinoPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      host: process.env.PGHOST,
      port: process.env.PGPORT ? Number(process.env.PGPORT) : undefined,
      database: process.env.PGDATABASE,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      ssl: process.env.PGSSL === "true" ? { rejectUnauthorized: false } : undefined,
      max: 5,
    });
  }

  return globalThis.promosTreinoPool;
}
