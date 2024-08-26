import { Router } from "express";
import isAuthAdmin from "../middlewares/isAuthAdmin.js";
import isAuthStudent from "../middlewares/isAuthStudent.js";
import adminAddEvents from "../controllers/auth/adminAddEvents.js";
import listEvents from "../controllers/auth/listEvents.js";
import deleteEvent from "../controllers/auth/deleteEvent.js";
import updateEvent from "../controllers/auth/updateEvent.js";
import getEventById from "../controllers/auth/getEventById.js";
import getStudentById from "../controllers/auth/getStudentById.js";
import listStudents from "../controllers/auth/listStudents.js";
import deleteStudentEvent from "../controllers/auth/deleteStudentEvent.js";
import getStatisticsStudentById from "../controllers/auth/deleteStudentEvent.js";
import listAvailableEvents from "../controllers/auth/listAvailableEvents.js";
import listJoinedEvents from '../controllers/auth/listJoinedEvents.js';
import listCheckInEvents from "../controllers/auth/listCheckInEvents.js";
import checkInEvent from "../controllers/auth/checkInEvent.js";
import cancelEvent from "../controllers/auth/cancelEvent.js";
import manageAccount from "../controllers/auth/manageAccount.js";
import getStudentAccount from "../controllers/auth/getStudentAccount.js";
import joinEvent from "../controllers/auth/joinEvent.js";
import getStudentEventById from "../controllers/auth/getStudentEventById.js";
import getStudentStatistics from "../controllers/auth/getStudentStatistics.js";

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

privateRouter.get("/admin/admin-list-students", listStudents);

privateRouter.delete("/admin/admin-delete-event/:id", deleteEvent);

privateRouter.delete("/admin/admin-delete-student/:id", deleteStudentEvent);

privateRouter.put("/admin/admin-update-event/:id", updateEvent);

privateRouter.get("/admin/event/:id", getEventById);

privateRouter.get("/admin/student/:id", getStudentById);

privateRouter.get("/student/student/:id", getStatisticsStudentById);

privateRouter.get("/student/student-list-available-events/:student_id", listAvailableEvents);

privateRouter.get("/student/student-list-joined-events/:student_id", listJoinedEvents);

privateRouter.get("/student/student-list-check-in-events/:student_id", listCheckInEvents);

privateRouter.put("/student/check-in-event/:student_id/:event_id", checkInEvent);

privateRouter.put("/student/cancel-event/:student_id/:event_id", cancelEvent);

privateRouter.put("/student/update-password/:id", manageAccount);

privateRouter.get("/student/account-management/:id", getStudentAccount);

privateRouter.post("/student/join-event/:student_id/:event_id", joinEvent);

privateRouter.get("/student/student-event/:id", getStudentEventById); 

privateRouter.get("/student/statistics/:student_id", getStudentStatistics);

// Student routes
privateRouter.get("/student/dashboard-student", (req, res) => {
    res.json({
        message: "Welcome to student dashboard"
    });
});

export default privateRouter;
