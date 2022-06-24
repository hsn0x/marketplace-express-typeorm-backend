import { Resource } from "../models/index.js";
import { RESOURCES } from "../constants/index.js";

export const createResources = async () => {
    await Resource.bulkCreate(RESOURCES);
};
