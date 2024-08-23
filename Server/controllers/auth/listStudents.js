import { pool } from "../../database/index.js";

const listStudents = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM STUDENT");
        res.json({
            student: result.rows
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export default listStudents;