import { pool } from "../database/index.js";

// create student_event table
const query = `
CREATE TABLE IF NOT EXISTS student_event (
    student_id INT,
    event_id INT,  
    status VARCHAR(20) DEFAULT 'pending',
    PRIMARY KEY (student_id, event_id), 
    FOREIGN KEY (student_id) REFERENCES student(student_id),
    FOREIGN KEY (event_id) REFERENCES event(event_id)
);
`;

async function createStudentEventTable() {
    try {
        await pool.query(query);
        console.log("Student-Event table is created");
    } catch (error) {
        console.error(error)
    }
}

export default createStudentEventTable;
