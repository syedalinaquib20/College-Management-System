import { pool } from "../../database/index.js";

const getStudentEventDetails = async (req, res) => {
    const { studentId, eventId } = req.params;

    try {
        const eventQuery = `
            SELECT e.event_id, e.event_name, e.event_date, e.event_place, e.max_participants, 
                   e.current_participants, e.event_type, se.status, e.points_allocated
            FROM event e
            INNER JOIN student_event se ON e.event_id = se.event_id
            WHERE se.student_id = $1 AND e.event_id = $2;
        `;

        const result = await pool.query(eventQuery, [studentId, eventId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No event found for this student" });
        }

        res.status(200).json({ event: result.rows[0] });
    } catch (error) {
        console.error("Error fetching event details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default getStudentEventDetails;
