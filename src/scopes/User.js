import UserSensitiveData from "../constants/SensitiveData.js";

import {
    Image,
    Market,
    Product,
    Avatar,
    Role,
    Student,
    User,
    Like,
    Vote,
    Favorite,
    Review,
    Comment,
} from "../models/index.js";

import {} from "./index.js";

User.addScope("withoutPassword", {
    attributes: {
        exclude: [...UserSensitiveData],
    },
});

User.addScope("withAssociations", {
    include: [
        { model: Market, include: [{ model: Avatar }, { model: Image }] },
        {
            model: Product,
            include: [
                { model: Image },
                {
                    model: Market,
                    include: [{ model: Avatar }, { model: Image }],
                },
                { model: Like },
                { model: Vote },
                { model: Favorite },
            ],
        },
        Image,
        Avatar,
        Role,
        Like,
        Vote,
        Favorite,
        Comment,
        Review,
    ],
});

export default User;
