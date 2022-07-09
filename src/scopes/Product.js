import UserSensitiveData from "../constants/SensitiveData.js";

import {
    Market,
    Product,
    Image,
    User,
    Avatar,
    Category,
    Like,
    Vote,
    Favorite,
    Comment,
    Review,
} from "../models/index.js";

Product.addScope("withAssociations", {
    include: [
        { model: Category },

        {
            model: User,
            attributes: {
                exclude: [...UserSensitiveData],
            },
        },
        { model: Market, include: [{ model: Avatar }] },
        { model: Image },
        { model: Like },
        { model: Vote },
        { model: Favorite },
        { model: Comment },
        { model: Review },
    ],
});

export default Product;
