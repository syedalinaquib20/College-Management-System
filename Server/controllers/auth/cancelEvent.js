import { pool } from "../../database/index.js";

const cancelEvent = async (req, res) => {
    const { student_id, event_id } = req.params;

    try {
        // Check if the event is in 'pending' status for the student
        const checkQuery = `
            SELECT *
            FROM student_event
            WHERE student_id = $1 AND event_id = $2 AND status = 'pending'
        `;
        const checkResult = await pool.query(checkQuery, [student_id, event_id]);

        if (checkResult.rows.length === 0) {
            return res.status(400).json({
                message: "Event cannot be cancelled because it's not in a pending state."
            });
        }

        // Decrease the current participants count in the event
        const decreaseParticipantsQuery = `
            UPDATE event
            SET current_participants = current_participants - 1
            WHERE event_id = $1 AND current_participants > 0
        `;
        await pool.query(decreaseParticipantsQuery, [event_id]);

        // Remove the event from the student's list (delete from student_event)
        const deleteStudentEventQuery = `
            DELETE FROM student_event
            WHERE student_id = $1 AND event_id = $2
        `;
        await pool.query(deleteStudentEventQuery, [student_id, event_id]);

        // Check if the event should be made available again
        const checkEventStatusQuery = `
            SELECT max_participants, current_participants
            FROM event
            WHERE event_id = $1
        `;
        const eventResult = await pool.query(checkEventStatusQuery, [event_id]);
        const event = eventResult.rows[0];

        let statusUpdateMessage = "Event cancelled successfully.";
        if (event.current_participants < event.max_participants) {
            const updateEventStatusQuery = `
                UPDATE event
                SET status = 'available'
                WHERE event_id = $1 AND status = 'full'
            `;
            await pool.query(updateEventStatusQuery, [event_id]);
            statusUpdateMessage += " Event is now available again.";
        }

        res.status(200).json({
            message: statusUpdateMessage
        });
    } catch (error) {
        console.error("Error cancelling event: ", error.message);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

export default cancelEvent;
