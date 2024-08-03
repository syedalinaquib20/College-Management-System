import { pool } from "../../database/index.js";

const deleteStudentEvent = async(req, res) => {
    const { id } = req.params;

    try {
        await pool.query("DELETE FROM student_event WHERE event_id = $1", [id]);
        res.status(200).json({
            message: "Event deleted successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internet server error"
        });
    }
}

export default deleteStudentEvent;