import { Pool } from "pg";

/**
 * Creates a PostgreSQL client pool.
 * Call this after dotenv.config() has been executed to ensure environment variables are loaded.
 */
export const createDBClient = () => {
  if (
    !process.env.DEV_DB_HOST ||
    !process.env.DEV_DB_PORT ||
    !process.env.DEV_DB_USER ||
    !process.env.DEV_DB_PASSWORD ||
    !process.env.DEV_DB_NAME
  ) {
    throw new Error("Database environment variables are not properly set.");
  }

  return new Pool({
    host: process.env.DEV_DB_HOST,
    port: parseInt(process.env.DEV_DB_PORT, 10),
    user: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    idleTimeoutMillis: 30000 // Close idle clients after 30 seconds
  });
};
