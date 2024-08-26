import { pool } from "../../database/index.js";

const getStudentAccount = async (req, res) => {
    const { id } = req.params;

    try {
        // Query to fetch the student data
        const studentResult = await pool.query("SELECT * FROM student WHERE student_id = $1", [id]);

        // Check if the student was found
        if (studentResult.rows.length === 0) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Return the student data
        res.status(200).json({ student: studentResult.rows[0] });
    } catch (error) {
        console.error("Error fetching student data:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

export default getStudentAccount;
