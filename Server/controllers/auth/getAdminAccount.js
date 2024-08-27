import { pool } from "../../database/index.js";

const getAdminAccount = async (req, res) => {
    const { id } = req.params;

    try {
        const adminResult = await pool.query("SELECT * FROM admin WHERE admin_id = $1", [id]);

        if (adminResult.rows.length === 0) {
            return res.status(404).json({ message: "Admin not found" });
        }

        res.status(200).json({ admin: adminResult.rows[0] });
    } catch (error) {
        console.error("Error fetching admin data:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

export default getAdminAccount;
