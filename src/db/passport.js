import passport from "passport"

import { usersQueries } from "../queries/index.js"
import { localStrategy } from "./strategies/Local.js"

passport.use(localStrategy)
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser(async (userId, done) => {
    try {
        const user = await findByPkQuery(userId, [
            "withoutPassword",
            "withAssociations",
        ])
        done(null, user)
    } catch (error) {
        done(error)
    }
})
