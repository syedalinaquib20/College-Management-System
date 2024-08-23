import { pool } from "../../database/index.js";

const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { event_name, event_date, event_place, max_participants } = req.body;

    try {
        const updateQuery = `
            UPDATE event 
            SET event_name = $1, event_date = $2, event_place = $3, max_participants = $4
            WHERE event_id = $5
        `;

        await pool.query(updateQuery, [event_name, event_date, event_place, max_participants, id]);

        res.status(200).json({
            message: "Event updated successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export default updateEvent;
