import dotenv from "dotenv";
dotenv.config();

export const SequelizeConfig = {
    database: process.env.S_DATABASE,
    username: process.env.S_USERNAME,
    password: process.env.S_PASSWORD,
    options: {
        dialect: process.env.S_DIALECT,
    },
};

export const expressConfig = {
    port: process.env.EXPRESS_PORT,
};

console.log({ SequelizeConfig, expressConfig });
