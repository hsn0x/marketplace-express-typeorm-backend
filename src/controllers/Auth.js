import { createUser } from "./User.js";
import passport from "passport";

const login = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err)
            return res.status(500).json({
                message: err.message,
            });

        if (!user)
            return res.status(401).json({
                isAuthenticated: req.isAuthenticated(),
                message: info.message,
            });

        req.login(user, (err) => {
            if (err) {
                return res.status(500).json({
                    isAuthenticated: req.isAuthenticated(),
                    message: err.message,
                });
            }

            return res.status(200).json({
                isAuthenticated: req.isAuthenticated(),
                message: "Login successful",
            });
        });
    })(req, res, next);
};

const register = async (req, res, next) => {
    await createUser(req, res, next);
};

const profile = async (req, res, next) => {
    return res.status(200).json({
        user: req.user,
    });
};

const logout = async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({
                message: err.message,
            });

            // next(err);
        }

        // res.setHeader(
        //     "set-cookie",
        //     "connect.sid=xd; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
        // );
        return next();
    });
};

const logoutSession = async (req, res, next) => {
    return req.session.destroy(function (err) {
        if (err) {
            return res.status(500).json({
                message: err.message,
            });

            // next(err);
        }

        res.status(200).clearCookie("connect.sid", { path: "/" }).json({
            status: "success",
            message: "Logged out successfully",
        });
    });
};

export { login, register, profile, logout, logoutSession };
