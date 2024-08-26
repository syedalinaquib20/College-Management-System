import { pool } from "../../database/index.js";
import bcrypt from 'bcrypt';

const manageAccount = async (req, res) => {
    const { id } = req.params; 
    const { current_password, new_password } = req.body;

    try {
        const studentResult = await pool.query("SELECT student_name, student_password FROM student WHERE student_id = $1", [id]);
        const student = studentResult.rows[0];

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        const isMatch = await bcrypt.compare(current_password, student.student_password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Current password is incorrect"
            });
        }

        const hashedPassword = await bcrypt.hash(new_password, 10);

        const updateQuery = `
            UPDATE student
            SET student_password = $1
            WHERE student_id = $2
        `;

        await pool.query(updateQuery, [hashedPassword, id]);

        res.status(200).json({
            message: "Password updated successfully"
        });

    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export default manageAccount;
