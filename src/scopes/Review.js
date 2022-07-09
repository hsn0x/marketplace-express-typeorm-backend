import UserSensitiveData from "../constants/SensitiveData.js";
import {
    Review,
    Product,
    Image,
    Avatar,
    User,
    Category,
} from "../models/index.js";

Review.addScope("withAssociations", {
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

export default Review;
