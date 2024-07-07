import { pool } from "../database/index.js";

// create student table

const query = `
CREATE TABLE IF NOT EXISTS student (
    student_id SERIAL PRIMARY KEY,
    student_name VARCHAR(255) UNIQUE NOT NULL,  
    student_email VARCHAR(255) UNIQUE NOT NULL, 
    student_password VARCHAR(255) NOT NULL, 
    created_at TIMESTAMP DEFAULT NOW(), 
    updated_at TIMESTAMP DEFAULT NOW()
);
`;

async function createStudentTable() {
    try {
        await pool.query(query);
        console.log("Student table is created");
    } catch (error) {
        console.error(error)
    }
}

export default createStudentTable;