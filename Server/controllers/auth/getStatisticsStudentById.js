import { pool } from "../../database/index.js";

const getStatisticsStudentById = async (req, res) => {
    try {
        const studentId = req.params.id;

        const joinedEventQuery = `
           SELECT e.event_id, e.event_name, e.event_date, e.event_place
           FROM event e
           JOIN student_event se ON e.event_id = se.event_id
           WHERE se.student_id = $1 
        `;
        const joinedEventsResult = await pool.query(joinedEventQuery, [studentId]);

        const checkInEventsQuery = `
            SELECT e.event_id, e.event_name, e.event_date, e.event_place
            FROM event e
            JOIN student_event se ON e.event_id = se.event_id
            WHERE se.student_id = $1 AND se.checked_in = true
        `;
        const checkInEventsResul = await pool.query(checkInEventsQuery, [studentId]);

        const pointsQuery = `
            SELECT student_points
            FROM student
            WHERE student_id = $1
        `;
        const pointsResult = await pool.query(pointsQuery, [studentId]);

        res.json({
            joinedEvents: joinedEventsResult.rows, 
            checkInEvents: checkInEventsResult.rows, 
            points: pointsResult.rows[0].student_points, 
        });
    } catch (error) {
        console.error("Error fetching student statistics", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}