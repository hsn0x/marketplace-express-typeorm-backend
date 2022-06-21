import sequelize from "./db/connection.js";
import { Market, Product, Student, User, Category } from "./models/index.js";
import { createFakeStudents } from "./seed/students.js";
import { createFakeUsers } from "./seed/users.js";
import "./associations/index.js";

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import _ from "lodash";

import { homeRoutes, productsRoute, usersRoute } from "./routes/index.js";
import { expressConfig } from "./config.js";

const app = express();
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use("/", homeRoutes);
app.use("/users", usersRoute);
app.use("/products", productsRoute);

const serverPort = expressConfig.port;

const server = async () => {
    // await sequelize.sync({ force: true });
    await sequelize.sync();
    await createFakeUsers();
    // await createFakeUsers(User);
    // await createFakeStudents(Student);
    // Code here
    app.listen(serverPort, () => {
        console.log(`API Server is runnig ..., on port ${serverPort}`);
    });
};

server();
