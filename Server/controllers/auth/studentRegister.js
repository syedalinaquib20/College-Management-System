import bcrypt from "bcrypt";
import { pool } from "../../database/index.js";
import { validateEmail } from "../../utils/helper.js";

const insertNewStudent = `
INSERT INTO student (student_name, student_email, student_gender, student_password)
VALUES ($1, $2, $3, $4)
`;

const checkEmailQuery = `
SELECT * FROM student 
WHERE student_email = $1
`;

const studentRegister = async (req, res) => {
    try {
        const student_name = req.body.student_name;
        const student_email = req.body.student_email;
        const student_gender = req.body.student_gender;
        const student_password = req.body.student_password;

        // validate the request body is not empty
        if (!student_name || !student_email || !student_gender || !student_password) {
            return res.status(400).json({
                message: "Name, Email, Gender and Password are required",
            });
        }

        const isValidEmail = validateEmail(student_email);
        if (!isValidEmail) {
            return res.status(400).json({
                message: "Invalid email", 
            });
        }

        // check if email already exists 
        const dbResEmail = await pool.query(checkEmailQuery, [student_email]);
        if(dbResEmail.rows.length > 0){
            return res.status(400).json({
                message: "Email already exists"
            })
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(student_password, salt);

        // Insert new student into the database
        await pool.query(insertNewStudent, [student_name, student_email, student_gender, hashedPassword]);

        // Send success response
        res.status(200).json({
            message: "You are successfully registered!"
        });
        

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error"});
    }
};

export default studentRegister;
