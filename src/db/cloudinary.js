import cloudinary from "cloudinary";
import { cloudinaryConfig } from "../config/index.js";

cloudinary.config(cloudinaryConfig);

const cloudinaryUpload = async (path) => {
    const result = await cloudinary.v2.uploader.upload(path);
    return result;
};

export { cloudinary, cloudinaryUpload };
