import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../../database/index.js";
import { validateEmail } from "../../utils/helper.js";

const adminLogin = async (req, res) => {
    try {
        const { admin_email, admin_password } = req.body;

        // Check if email and password are provided
        if (!admin_email || !admin_password) {
            console.log("Bad request: missing email or password");
            return res.status(400).json({
                message: "Bad request",
            });
        }

        const isValidEmail = validateEmail(admin_email);
        if (!isValidEmail) {
            console.log("Invalid email format");
            return res.status(400).json({
                message: "Invalid email",
            });
        }

        // Check if admin email exists in the database
        const query = `SELECT * FROM admin WHERE admin_email = $1`;
        const dbRes = await pool.query(query, [admin_email]);
        const user = dbRes.rows[0];

        // If user is not found return 404
        if (!user) {
            console.log("User not found");
            return res.status(404).json({
                message: "User not found", 
            });
        }

        // Check if password is correct using bcrypt
        const isValidPassword = bcrypt.compareSync(admin_password, user.admin_password);

        // If password is not correct return 401
        if (!isValidPassword) {
            console.log("Unauthorized: invalid password");
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        // Create token using jwt 
        const data = {
            id: user.admin_id, 
            email: user.admin_email, 
        };
        const secretKey = process.env.JWT_SECRET_KEY; 

        const token = jwt.sign(data, secretKey);

        res.status(200).json({
            message: "You are successfully login!", 
            token: token,
            loginStatus: true,
            admin_name: user.admin_name, 
            admin_id: user.admin_id
        });
        
    } catch (error) {
        console.error("Internal server error: ", error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};

export default adminLogin;
