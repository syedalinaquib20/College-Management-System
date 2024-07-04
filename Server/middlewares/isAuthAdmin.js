import jwt from "jsonwebtoken";

const isAuthAdmin = (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
        return res.status(401).json({
            message: "Unauthorized", 
        });
    }

    const token = bearerToken.split(" ")[1];

    // check if token is provided
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized", 
        });
    }

    // check if token is valid 
    const secretKey = process.env.JWT_SECRET_KEY;
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Invalid token", 
            });
        }

        // Pass user id and email to the next middleware or controller
        req.admin_id = decoded.admin_id;
        req.admin_email = decoded.admin_email;
        
        // Call the next middleware or route handler
        next();
    });
}

export default isAuthAdmin;
