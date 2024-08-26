import { pool } from "../../database/index.js";

const getStudentEventById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query("SELECT * FROM event WHERE event_id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json({ event: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export default getStudentEventById;
