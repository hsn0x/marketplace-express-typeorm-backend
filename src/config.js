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

export const cloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
};
console.log({ SequelizeConfig, expressConfig, cloudinaryConfig });
