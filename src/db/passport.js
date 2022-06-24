import passport from "passport";

import { findOneUserQuery } from "../queries/users.js";
import { Avatar, Image, Market, Product, Role } from "../models/index.js";
import { localStrategy } from "./strategies/Local.js";

passport.use(localStrategy);
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (userId, done) => {
    try {
        const user = await findOneUserQuery({ id: userId });
        done(null, user);
    } catch (error) {
        done(error);
    }
});
