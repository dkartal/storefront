import dotenv from "dotenv";
import app from "./app";
import { createDBClient } from "./config/db";

dotenv.config();

const PORT = process.env.SERVER_PORT;

if (!PORT) {
  throw new Error("PORT is not defined in the environment variables.");
}

const dbClient = createDBClient();

dbClient
  .query("SELECT NOW()") // Test query
  .then((res) => {
    console.log("Database connected successfully at:", res.rows[0].now);

    // Start the server only if the database connection is successful
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);

    // Stop the process with a failure code
    process.exit(1);
  });

export { dbClient };
