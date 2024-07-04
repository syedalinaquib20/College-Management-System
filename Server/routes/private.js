import { Router } from "express";
import isAuthAdmin from "../middlewares/isAuthAdmin.js";

const privateRouter = Router();

privateRouter.use(isAuthAdmin);

privateRouter.get("/helloworld", (req, res) => {
    res.send("<h1>Hello world!</h1>");
})

privateRouter.get("/helloworld-json", (req, res) => {
    res.json({
        message: "Hello world!"
    });
});

privateRouter.get("/dashboard", (req, res) => {
    res.json({
        message: "Welcome to dashboard"
    });
});

export default privateRouter;