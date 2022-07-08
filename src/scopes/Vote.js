import UserSensitiveData from "../constants/SensitiveData.js";
import { Vote, Product, Image, User } from "../models/index.js";

Vote.addScope("withAssociations", {
    include: [
        {
            model: User,
            attributes: {
                exclude: [...UserSensitiveData],
            },
        },
        {
            model: Product,
            include: [{ model: Image }],
        },
    ],
});

export default Vote;
