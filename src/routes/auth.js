import { Router } from "express";
import passport from "passport";
import { login, register } from "../controllers/Auth.js";

const router = Router();

router.post(
    "/login",
    passport.authenticate("local", {
        failureRedirect: "/auth/login-failure",
        successRedirect: "/auth/login-success",
    })
);
router.post("/register", register);
router.get("/login-failure", (req, res, next) => {
    res.status(401).json({
        message: "Invalid username or password",
    });
});
router.get("/login-success", (req, res, next) => {
    res.status(200).json({
        message: "Login successful",
    });
});

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err);
        }
        res.status(200).json({
            status: "success",
            message: "Logged out successfully",
        });
    });
});

export default router;
