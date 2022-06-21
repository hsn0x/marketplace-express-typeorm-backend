import Sequelize from "sequelize";
import { SequelizeConfig } from "../config.js";

const { database, username, password, options } = SequelizeConfig;

const sequelize = new Sequelize(database, username, password, options);

try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
} catch (error) {
    console.error("Unable to connect to the database:", error);
}

export default sequelize;
