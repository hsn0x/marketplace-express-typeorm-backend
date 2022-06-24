import { Router } from "express";
import passport from "passport";
import { login, register } from "../controllers/Auth.js";
import {
    isAuth,
    isEmailExist,
    isGuest,
    isUsernameTaken,
} from "../middleware/Auth.js";

const router = Router();

router.post(
    "/login",
    isGuest,
    passport.authenticate("local", {
        failureRedirect: "/auth/login-failure",
        successRedirect: "/auth/login-success",
    })
);
router.post("/register", isGuest, isEmailExist, isUsernameTaken, register);
router.get("/login-failure", isGuest, (req, res, next) => {
    res.status(401).json({
        message: "Invalid username or password",
    });
});
router.get("/login-success", isAuth, (req, res, next) => {
    res.status(200).json({
        message: "Login successful",
    });
});

router.get("/logout", isAuth, (req, res, next) => {
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
