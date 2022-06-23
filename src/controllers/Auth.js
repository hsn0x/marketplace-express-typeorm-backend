const login = async (req, res, next) => {
    res.status(200).json({ message: "Login" });
};

const register = async (req, res, next) => {
    res.status(200).json({ message: "Register" });
};

export { login, register };
