import { Router } from "express";
import adminlogin from "../controllers/auth/adminLogin.js"
import adminRegister from "../controllers/auth/adminRegister.js";
import studentLogin from "../controllers/auth/studentLogin.js";
import studentRegister from "../controllers/auth/studentRegister.js";

const publicRouter = Router();

publicRouter.get("/helloworld", (req, res) => {
    res.send("<h1>Hello world!</h1>");
})

publicRouter.get("/helloworld-json", (req, res) => {
    res.json({
        message: "Hello world!"
    });
});

publicRouter.get("/dashboard", (req, res) => {
    res.json({
        message: "Welcome to dashboard"
    });
});

publicRouter.post("/admin-login", adminlogin);
publicRouter.post("/admin-register", adminRegister);
publicRouter.post("/student-login", studentLogin);
publicRouter.post("/student-register", studentRegister);

export default publicRouter;