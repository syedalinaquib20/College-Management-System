import { pool } from "../../database/index.js";

const listAvailableEvents = async (req, res) => {
    const { student_id } = req.params;
    try {
        const query = `
            SELECT 
                e.event_id,
                e.event_name,
                e.event_date,
                e.event_place,
                e.max_participants,
                e.current_participants,
                e.event_type,
                e.status,
                e.points_allocated
            FROM event e
            WHERE NOT EXISTS (
                SELECT 1 
                FROM student_event se 
                WHERE se.event_id = e.event_id 
                AND se.student_id = $1
            )
        `;
        const result = await pool.query(query, [student_id]);

        res.json({
            events: result.rows
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export default listAvailableEvents;
