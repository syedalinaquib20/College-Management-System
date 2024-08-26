import { pool } from "../../database/index.js";

const checkInEvent = async (req, res) => {
    const { student_id, event_id } = req.params;
    console.log("Student ID: ", student_id);
    console.log("Event ID: ", event_id);

    try {
        // Update the student_event status to 'joined'
        const updateStatusQuery = `
            UPDATE student_event
            SET status = 'joined'
            WHERE student_id = $1 AND event_id = $2
        `;
        await pool.query(updateStatusQuery, [student_id, event_id]);

        // Get the points allocated for the event
        const getPointsQuery = `
            SELECT points_allocated
            FROM event
            WHERE event_id = $1
        `;
        const eventResult = await pool.query(getPointsQuery, [event_id]);
        const pointsAllocated = eventResult.rows[0].points_allocated;

        // Add the points to the student's total points
        const updateStudentPointsQuery = `
            UPDATE student
            SET total_points = total_points + $1
            WHERE student_id = $2
        `;
        await pool.query(updateStudentPointsQuery, [pointsAllocated, student_id]);

        res.status(200).json({
            message: "Event checked in successfully and points updated"
        });
    } catch (error) {
        console.error("Error checking into event: ", error);
        res.status(500).json({
            message: "Failed to check into the event"
        });
    }
}

export default checkInEvent;
