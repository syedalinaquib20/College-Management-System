import { pool } from "../../database/index.js";
import multer from "multer";
import path from "path";

// Configure Multer storage 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "C:/Users/Syed Ali Naquib/Desktop/Bootcamp_Exercise/College_Management_System/Events_Poster_Picture");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage }).single("event_picture");

const insertNewEvent = `
INSERT INTO event (event_name, event_date, event_place, event_type, max_participants, points_allocated)
VALUES ($1, $2, $3, $4, $5, $6)
`;

const checkEventName = `
SELECT * FROM event 
WHERE event_name = $1
`;

const adminAddEvents = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({
                message: err.message
            });
        }

        try {
            const { event_name, event_date, event_place, event_type, max_participants } = req.body;

            const event_picture = req.file ? req.file.path : null;

            if (!event_name || !event_date || !event_place || !max_participants || !event_type) {
                return res.status(400).json({
                    message: "Event name, date, place, type, and participants are required",
                });
            }

            const dbResEventName = await pool.query(checkEventName, [event_name]);
            if (dbResEventName.rows.length > 0) {
                return res.status(400).json({
                    message: "Event name already exists"
                });
            }

            let points_allocated = 0;
            switch (event_type.toLowerCase()) {
                case 'jpk': 
                    points_allocated = 3;
                    break;
                case 'mpp': 
                    points_allocated = 3;
                    break;
                case 'faculty': 
                    points_allocated = 2;
                    break;
                case 'club': 
                    points_allocated = 1;
                    break;
                default: 
                    points_allocated = 0;
            }

            await pool.query(insertNewEvent, [event_name, event_date, event_place, event_type, max_participants, points_allocated]);

            res.status(200).json({
                message: "You have successfully registered the event!"
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
};

export default adminAddEvents;
