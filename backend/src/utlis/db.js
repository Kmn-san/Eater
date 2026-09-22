import { ENV } from "../config/env.js";
import pg from "pg";
const isProduction = ENV.NODE_ENV === "production"
export const pool = new pg.Pool({
    connectionString: ENV.DATABASE_URL,
    ssl: isProduction ? { rejectUnauthorized: false } : false
})

pool.connect((error, client, release) => {
    if (error) {
        console.error("Error connecting with database: ", error);
    } else {
        console.log("Connect to database successfully");
        release()
    }
})

pool.on("error", (err) => {
    console.error("Unexpected error on idle database client", err);
    process.exit(-1);
});

// Export a robust query method
export const query = (text, params) => pool.query(text, params);