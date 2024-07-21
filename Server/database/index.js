import pkg from "pg";
// import dotenv from "dotenv" to use .env file
import "dotenv/config";
import createAdminTable from "../models/admin.js";
import createStudentTable from "../models/student.js";
import createEventTable from "../models/event.js";

const { Pool } = pkg;

export const pool = new Pool({
    host: process.env.PGHOST, 
    user: process.env.PGUSER, 
    password: process.env.PGPASSWORD, 
    database: process.env.PGDATABASE, 
    max: 20, 
    idleTimeOutMillis: 3000, 
    connectionTimeoutMillis: 2000,
});

export async function databaseInit() {
    try {
        const dbName = await pool.query("SELECT current_database()");
        const dbRes = await pool.query("SELECT NOW()");
        const time = dbRes.rows[0].now;
        const name = dbName.rows[0].current_database;
        console.log(`Connected ${name} at ${time}`);

        // create admin table
        await createAdminTable();

        // create student table 
        await createStudentTable();

        // create event table
        await createEventTable();

    } catch (error) {
        console.error(error); 
        console.error("Database connection failed");
    }
}