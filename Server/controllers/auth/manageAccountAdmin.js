import { pool } from "../../database/index.js";
import bcrypt from 'bcrypt';

const manageAccountAdmin = async (req, res) => {
    const { id } = req.params; 
    const { current_password, new_password } = req.body;

    try {
        const adminResult = await pool.query("SELECT admin_name, admin_password FROM admin WHERE admin_id = $1", [id]);
        const admin = adminResult.rows[0];

        if (!admin) {
            return res.status(404).json({
                message: "Admin not found"
            });
        }

        const isMatch = await bcrypt.compare(current_password, admin.admin_password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Current password is incorrect"
            });
        }

        const hashedPassword = await bcrypt.hash(new_password, 10);

        const updateQuery = `
            UPDATE admin
            SET admin_password = $1
            WHERE admin_id = $2
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

export default manageAccountAdmin;
