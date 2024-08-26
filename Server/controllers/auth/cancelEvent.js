import { pool } from "../../database/index.js";

const cancelEvent = async (req, res) => {
    const { studentId, eventId } = req.body;

    try {
        const query = `
            UPDATE student_event
            SET status = 'cancelled'
            WHERE student_id = $1 AND event_id = $2
        `;
        await pool.query(query, [studentId, eventId]);

        res.status(200).json({ message: "Event cancelled successfully" });
    } catch (error) {
        console.error("Error cancelling event:", error);
        res.status(500).json({ message: "Failed to cancel the event" });
    }
};

export default cancelEvent;
