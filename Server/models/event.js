import { pool } from "../database/index.js";

// create event table 
const query = `
CREATE TABLE IF NOT EXISTS event (
    event_id SERIAL PRIMARY KEY, 
    event_name VARCHAR(255) NOT NULL, 
    event_date TIMESTAMP NOT NULL, 
    event_place VARCHAR (255) NOT NULL, 
    event_picture VARCHAR(255), 
    participants INTEGER DEFAULT 0, 
    created_at TIMESTAMP DEFAULT NOW(), 
    updated_at TIMESTAMP DEFAULT NOW()
);
`;

async function createEventTable() {
    try {
        await pool.query(query);
        console.log("Event table is created");
    } catch (error) {
        console.error(error);
    }
}

export default createEventTable;