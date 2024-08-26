import { pool } from "../../database/index.js";

const getStudentStatistics = async (req, res) => {
    const { student_id } = req.params;

    try {

        const joinedEventsQuery = `
            SELECT COUNT(*) AS joined_events_count
            FROM student_event 
            WHERE student_id = $1 AND status = 'joined'
        `;
        const joinedEventsResult = await pool.query(joinedEventsQuery, [student_id]);
        const joinedEventsCount = parseInt(joinedEventsResult.rows[0].joined_events_count, 10);

        const checkInEventsQuery = `
            SELECT COUNT(*) AS check_in_events_count
            FROM student_event 
            WHERE student_id = $1 AND status = 'pending'
        `;
        const checkInEventsResult = await pool.query(checkInEventsQuery, [student_id]);
        const checkInEventsCount = parseInt(checkInEventsResult.rows[0].check_in_events_count, 10);

        const pointsQuery = `
            SELECT total_points
            FROM student
            WHERE student_id = $1
        `;
        const pointsResult = await pool.query(pointsQuery, [student_id]);
        const totalPoints = parseInt(pointsResult.rows[0].total_points, 10);

        res.status(200).json({
            joinedEvents: joinedEventsCount, 
            checkInEvents: checkInEventsCount, 
            points: totalPoints,
        });

    } catch (error) {
        console.error("Error fetching student statistics", error.message);
        res.status(500).json({
            message: "Internal server error",
        });
    }
}

export default getStudentStatistics;