import { createUser } from "./User.js";

const login = async (req, res, next) => {
    res.status(200).json({ message: "Login" });
};

const register = async (req, res, next) => {
    await createUser(req, res, next);
};

export { login, register };
