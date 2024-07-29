import { Router } from "express";
import isAuthAdmin from "../middlewares/isAuthAdmin.js";
import isAuthStudent from "../middlewares/isAuthStudent.js";
import adminAddEvents from "../controllers/auth/adminAddEvents.js";
import listEvents from "../controllers/auth/listEvents.js";
import deleteEvent from "../controllers/auth/deleteEvent.js";
import updateEvent from "../controllers/auth/updateEvent.js";
import getEventById from "../controllers/auth/getEventById.js";

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

privateRouter.get("/admin/admin-list-events", listEvents);

privateRouter.delete("/admin/admin-delete-event/:id", deleteEvent);

privateRouter.put("/admin/admin-update-event/:id", updateEvent);

privateRouter.get("/admin/event/:id", getEventById);

// Student routes
privateRouter.get("/student/dashboard-student", (req, res) => {
    res.json({
        message: "Welcome to student dashboard"
    });
});

export default privateRouter;
