import { pool } from "../../database/index.js";

const listStudentsEvents = async (req, res) => {
    try {
        const query = `
            SELECT 
                s.student_id, s.student_name, 
                s.student_email, s.student_password, 
                s.student_points, e.event_name
            FROM 
                student s
            LEFT JOIN
                student_event se ON s.student_id = se.student_id
            LEFT JOIN 
                event e ON se.event_id = e.event_id
        `;

        const result = await pool.query(query);
        res.status(200).json({ students: result.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export default listStudentsEvents;
