import { pool } from "../../database/index.js";

const listEvents = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM EVENT");
        res.json({
            events: result.rows
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export default listEvents;