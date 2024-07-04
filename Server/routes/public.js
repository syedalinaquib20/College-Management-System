import { Router } from "express";
import adminlogin from "../controllers/auth/adminLogin.js"
import adminRegister from "../controllers/auth/adminRegister.js";

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

export default publicRouter;