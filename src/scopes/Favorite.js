import UserSensitiveData from "../constants/SensitiveData.js";
import { Favorite, Product, Image, User } from "../models/index.js";

Favorite.addScope("withAssociations", {
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

export default Favorite;
