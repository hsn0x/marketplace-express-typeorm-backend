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
console.log({ SequelizeConfig });
