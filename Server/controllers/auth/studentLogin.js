import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../../database/index.js";
import { validateEmail } from "../../utils/helper.js";

const studentLogin = async (req, res) => {
    try {
        const { student_email, student_password } = req.body;

        // Check if email and password are provided
        if (!student_email || !student_password) {
            console.log("Bad request: missing email or password");
            return res.status(400).json({
                message: "Bad request",
            });
        }

        const isValidEmail = validateEmail(student_email);
        if (!isValidEmail) {
            console.log("Invalid email format");
            return res.status(400).json({
                message: "Invalid email",
            });
        }

        // Check if student email exists in the database
        const query = `SELECT * FROM student WHERE student_email = $1`;
        const dbRes = await pool.query(query, [student_email]);
        const user = dbRes.rows[0];

        // If user is not found return 404
        if (!user) {
            console.log("User not found");
            return res.status(404).json({
                message: "User not found", 
            });
        }

        // Check if password is correct using bcrypt
        const isValidPassword = bcrypt.compareSync(student_password, user.student_password);

        // If password is not correct return 401
        if (!isValidPassword) {
            console.log("Unauthorized: invalid password");
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

         // Create token using jwt 
         const data = {
            id: user.student_id, 
            email: user.student_email, 
        };
        const secretKey = process.env.JWT_SECRET_KEY; 

        const token = jwt.sign(data, secretKey);

        res.status(200).json({
            message: "You are successfully login!", 
            token: token,
            loginStatus: true,
            student_name: user.student_name, 
            student_id: user.student_id
        });

    } catch (error) {
        console.error(error)
        console.error("Internal server error: ", error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
}

export default studentLogin;