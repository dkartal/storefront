import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const dbName =
  process.env.ENV === "test"
    ? process.env.TEST_DB_NAME
    : process.env.DEV_DB_NAME;

if (
  !process.env.DB_HOST ||
  !process.env.DB_PORT ||
  !process.env.DB_USER ||
  !process.env.DB_PASSWORD ||
  !dbName
) {
  throw new Error("Database environment variables are not properly set.");
}


const dbClient = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: dbName,
  idleTimeoutMillis: 30000 // Close idle clients after 30 seconds
});

export default dbClient;
