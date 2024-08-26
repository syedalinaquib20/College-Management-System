import { pool } from "../../database/index.js";

const joinEvent = async (req, res) => {
    const { student_id, event_id } = req.params;
    console.log("Student ID: ", student_id);
    console.log("Event ID: ", event_id);

    try {
        // Check if the event has reached the max number of participants
        const checkParticipantsQuery = `
            SELECT max_participants, current_participants
            FROM event
            WHERE event_id = $1
        `;
        const eventResult = await pool.query(checkParticipantsQuery, [event_id]);
        const event = eventResult.rows[0];

        if (!event) {
            return res.status(404).json({ message: "Event not found." });
        }

        if (event.current_participants >= event.max_participants) {
            return res.status(400).json({ message: "Event is fully booked." });
        }

        // Insert or update the student_event relationship
        const joinQuery = `
            INSERT INTO student_event (student_id, event_id, status)
            VALUES ($1, $2, 'pending')
            ON CONFLICT (student_id, event_id)
            DO UPDATE SET status = 'pending'
        `;

        await pool.query(joinQuery, [student_id, event_id]);

        // Update the current number of participants in the event
        const updateEventQuery = `
            UPDATE event
            SET current_participants = current_participants + 1
            WHERE event_id = $1
        `;

        await pool.query(updateEventQuery, [event_id]);

        res.status(200).json({ message: "Event joined successfully and status set to pending." });
    } catch (error) {
        console.error("Error joining event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default joinEvent;
