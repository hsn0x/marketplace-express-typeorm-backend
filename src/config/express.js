import dotenv from "dotenv";
dotenv.config();

export const expressConfig = {
    port: process.env.EXPRESS_PORT,
};
