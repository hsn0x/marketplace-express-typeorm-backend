import UserSensitiveData from "../constants/SensitiveData.js";
import {
    Comment,
    Product,
    Image,
    Avatar,
    User,
    Category,
} from "../models/index.js";

Comment.addScope("withAssociations", {
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

export default Comment;
