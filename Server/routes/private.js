import { Router } from "express";
import isAuthAdmin from "../middlewares/isAuthAdmin.js";
import isAuthStudent from "../middlewares/isAuthStudent.js";
import adminAddEvents from "../controllers/auth/adminAddEvents.js";

const privateRouter = Router();

// Middleware for routes that require admin authentication
privateRouter.use("/admin", isAuthAdmin);

// Middleware for routes that require student authentication
privateRouter.use("/student", isAuthStudent);

// Admin routes
privateRouter.get("/admin/dashboard", (req, res) => {
    res.json({
        message: "Welcome to admin dashboard"
    });
});

privateRouter.post("/admin/admin-add-events", adminAddEvents);

// Student routes
privateRouter.get("/student/dashboard-student", (req, res) => {
    res.json({
        message: "Welcome to student dashboard"
    });
});

export default privateRouter;
