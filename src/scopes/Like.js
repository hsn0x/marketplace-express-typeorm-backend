import UserSensitiveData from "../constants/SensitiveData.js";
import { Like, Product, Image, User } from "../models/index.js";

Like.addScope("withAssociations", {
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

export default Like;
