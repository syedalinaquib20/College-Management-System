import bcrypt from "bcrypt";
import { pool } from "../../database/index.js";
import { validateEmail } from "../../utils/helper.js";
import sendEmail from "../../service/email.js"

const insertNewAdmin = `
INSERT INTO admin (admin_name, admin_email, admin_password)
VALUES ($1, $2, $3)
`;

const checkEmailQuery = `
SELECT * FROM admin 
WHERE admin_email = $1
`;

const adminRegister = async (req, res) => {
    try {
        const admin_name = req.body.admin_name;
        const admin_email = req.body.admin_email;
        const admin_password = req.body.admin_password;

        // validate the request body is not empty
        if (!admin_name || !admin_email || !admin_password) {
            return res.status(400).json({
                message: "Name, Email and Password are required",
            });
        }

        const isValidEmail = validateEmail(admin_email);
        if (!isValidEmail) {
            return res.status(400).json({
                message: "Invalid email", 
            });
        }

        // check if email already exists 
        const dbResEmail = await pool.query(checkEmailQuery, [admin_email]);
        if(dbResEmail.rows.length > 0){
            return res.status(400).json({
                message: "Email already exists"
            })
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(admin_password, salt);

        // Insert new admin into the database
        await pool.query(insertNewAdmin, [admin_name, admin_email, hashedPassword]);

        // Send success response
        res.status(200).json({
            message: "You are successfully registered!"
        });
        

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error"});
    }
};

export default adminRegister;
