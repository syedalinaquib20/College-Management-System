import { pool } from "../../database/index.js";

const listCheckInEvents = async (req, res) => {
    const { student_id } = req.params;

    try {
        const query = `
            SELECT e.event_id, e.event_name, e.event_date, e.event_place, e.event_type, se.status, e.points_allocated
            FROM student_event se 
            JOIN event e ON se.event_id = e.event_id
            WHERE se.student_id = $1 AND se.status = 'pending'
        `;

        const result = await pool.query(query, [student_id]);

        if (result.rows.length === 0) {
            console.log(`No pending events found for student_id: ${student_id}`);
        }

        res.json({
            events: result.rows
        });

    } catch (error) {
        console.error("Error fetching check-in events:", error.message);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export default listCheckInEvents;
