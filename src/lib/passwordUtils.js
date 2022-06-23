import crypto from "crypto";

const genPassword = (password) => {
    const salt = crypto.randomBytes(32).toString("hex");
    const hash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, "sha512")
        .toString("hex");
    return {
        salt,
        hash,
    };
};

const validPassword = (password, hash, salt) => {
    const hashVerify = crypto
        .pbkdf2Sync(password, salt, 1000, 64, "sha512")
        .toString("hex");
    return hash === hashVerify;
};

export { genPassword, validPassword };
