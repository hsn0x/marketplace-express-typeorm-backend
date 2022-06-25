import UserSensitiveData from "../constants/SensitiveData.js";
import { Market, Category, Image, User } from "../models/index.js";

Category.addScope("withAssociations", {
    include: [
        {
            model: User,
            attributes: {
                exclude: [...UserSensitiveData],
            },
        },
        { model: Market },
        { model: Image },
    ],
});

export default Category;
