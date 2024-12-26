import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

let dbName: string = "";

if (process.env.ENV === "test") {
  dbName = process.env.TEST_DB_NAME || "";
} else if (process.env.ENV === "dev") {
  dbName = process.env.DEV_DB_NAME || "";
} else {
  dbName = process.env.PROD_DB_NAME || "";
}

if (!dbName) {
  throw new Error("Database environment variables are not properly set.");
}

if (
  !process.env.DB_HOST ||
  !process.env.DB_PORT ||
  !process.env.DB_USER ||
  !process.env.DB_PASSWORD ||
  !dbName
) {
  throw new Error("Database environment variables are not properly set.");
}

// Enable SSL
const sslConfig =
  process.env.ENV === "prod"
    ? { rejectUnauthorized: false } // For production
    : false; // No SSL in non-production environments


const dbClient = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: dbName,
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  ssl: sslConfig
});

export default dbClient;
