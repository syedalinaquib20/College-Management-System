import { pool } from "../database/index.js";

// create student_event table
const query = `
CREATE TABLE IF NOT EXISTS student_event (
    student_id INTEGER,
    event_id INTEGER,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (student_id, event_id),
    FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES event(event_id) ON DELETE CASCADE
);
`;

async function createStudentEventTable() {
    try {
        await pool.query(query);
        console.log("Student-Event table is created");
    } catch (error) {
        console.error("Error creating student_event table:", error);
    }
}

export default createStudentEventTable;
