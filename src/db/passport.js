import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
    findOneUserByEmailQuery,
    findOneUserByIdQuery,
} from "../queries/users.js";
import { validPassword } from "../lib/passwordUtils.js";

const customFields = {
    usernameField: "email",
    passwordField: "password",
};

const verifyCallback = async (email, password, done) => {
    try {
        console.log({ email, password });
        const user = await findOneUserByEmailQuery({ email });
        if (!user) {
            return done(null, false, {
                message: "Incorrect email or password.",
            });
        }
        console.log({ user });
        const isValid = validPassword(
            password,
            user.passwordHash,
            user.passwordSalt
        );
        if (!isValid) {
            return done(null, false, {
                message: "Incorrect email or password.",
            });
        }
        console.log({ isValid });
        return done(null, user);
    } catch (error) {
        done(error);
    }
};

const localStrategy = new LocalStrategy(customFields, verifyCallback);

passport.use(localStrategy);
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (userId, done) => {
    try {
        const user = await findOneUserByIdQuery({ id: userId });
        done(null, user);
    } catch (error) {
        done(error);
    }
});
