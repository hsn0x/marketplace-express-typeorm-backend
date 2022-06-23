export const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    proxy: true, // if you do SSL outside of node.
    saveUninitialized: true, // create a session even if there is no cookie
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
};
