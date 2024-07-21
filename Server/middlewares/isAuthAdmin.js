import jwt from "jsonwebtoken";

const isAuthAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if authorization header is provided
    if (!authHeader) {
        console.log("No authorization header provided");
        return res.status(401).json({
            message: "Unauthorized - No token provided",
        });
    }

    // Extract token from Bearer scheme
    const token = authHeader.split(" ")[1];

    // Check if token is provided after 'Bearer'
    if (!token) {
        console.log("No token provided after 'Bearer'");
        return res.status(401).json({
            message: "Unauthorized - Token missing",
        });
    }

    // Verify the token
    const secretKey = process.env.JWT_SECRET_KEY;
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.log("Token verification failed:", err);
            return res.status(401).json({
                message: "Invalid token",
            });
        }

        // Pass the decoded information to the request object
        req.admin_id = decoded.id; // Assuming 'id' is the payload key for admin_id
        req.admin_email = decoded.email; // Assuming 'email' is the payload key for admin_email

        console.log("Token verified successfully");
        // Proceed to the next middleware or route handler
        next();
    });
};

export default isAuthAdmin;
