import { pool } from "../../database/index.js";

const listJoinedEvents = async (req, res) => {
    const { student_id } = req.params;

    try {
        const query = `
            SELECT e.event_id, e.event_name, e.event_date, e.event_place, e.event_type, e.points_allocated, se.status
            FROM student_event se
            JOIN event e ON se.event_id = e.event_id
            WHERE se.student_id = $1
        `;
        const result = await pool.query(query, [student_id]);

        res.json({
            events: result.rows
        });
        
    } catch (error) {
        console.error("Error fetching joined events:", error);
        res.status(500).json({ 
            message: "Internal server error" 
        });
    }
};

export default listJoinedEvents;
