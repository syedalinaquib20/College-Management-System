import { pool } from "../database/index.js";

// create admin table

const query = `
CREATE TABLE IF NOT EXISTS admin (
    admin_id SERIAL PRIMARY KEY,
    admin_name VARCHAR(255) UNIQUE NOT NULL,  
    admin_email VARCHAR(255) UNIQUE NOT NULL, 
    admin_password VARCHAR(255) NOT NULL, 
    created_at TIMESTAMP DEFAULT NOW(), 
    updated_at TIMESTAMP DEFAULT NOW()
);
`;

async function createAdminTable() {
    try {
        await pool.query(query);
        console.log("Admin table is created");
    } catch (error) {
        console.error(error)
    }
}

export default createAdminTable;