// NPM Modules
import express from "express";
import passport from "passport";
// Local Import
import sequelize from "./db/connection.js";
import "./associations/index.js";

// Route
import routes from "./routes/index.js";
import middlewares from "./middleware/index.js";

// ENV Config
import { expressConfig } from "./config/index.js";

// Seed Database
import { dbSeed } from "./seed/index.js";

const app = express();

app.use(middlewares);

/**
 * -------------- ROUTES ----------------
 */

app.use(routes);

const serverPort = expressConfig.port;

const server = async () => {
    await sequelize.sync({ force: true });
    // await sequelize.sync();
    await dbSeed();

    app.listen(serverPort, () => {
        console.log(
            `Sequelize API Server is runnig ..., on port ${serverPort}`
        );
    });
};

server();
