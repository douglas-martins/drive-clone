import { drizzle } from "drizzle-orm/singlestore";
import { createPool, type Pool } from "mysql2/promise";

import { env } from "~/env";
import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: Pool | undefined;
};

export const conn =
  globalForDb.conn ?? createPool({
    host: String(env.SINGLESTORE_HOST),
    port: parseInt(String(env.SINGLESTORE_PORT)),
    user: String(env.SINGLESTORE_USER),
    password: String(env.SINGLESTORE_PASSWORD),
    database: String(env.SINGLESTORE_DATABASE),
    ssl: {},
    maxIdle: 0,
  });
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

conn.addListener("error", (err) => {
  console.error("Database connection error", err);
});

export const db = drizzle(conn, { schema });
