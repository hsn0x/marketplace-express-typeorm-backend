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
        {
            model: Category,
            seperate: true,
        },
        {
            model: User,
            seperate: true,
            attributes: {
                exclude: [...UserSensitiveData],
            },
        },
        {
            model: Market,
            seperate: true,
            include: [
                {
                    model: Avatar,
                    seperate: true,
                },
            ],
        },
        {
            model: Image,
            seperate: true,
        },
        {
            model: Like,
            seperate: true,
        },
        {
            model: Vote,
            seperate: true,
        },
        {
            model: Favorite,
            seperate: true,
        },
        {
            model: Comment,
            seperate: true,
            include: [
                {
                    model: User,
                    seperate: true,
                    include: [
                        {
                            model: Avatar,
                            seperate: true,
                        },
                        {
                            model: Image,
                            seperate: true,
                        },
                    ],
                },
            ],
        },
        {
            model: Review,
            seperate: true,
            include: [
                {
                    model: User,
                    seperate: true,
                    include: [
                        {
                            model: Avatar,
                            seperate: true,
                        },
                        {
                            model: Image,
                            seperate: true,
                        },
                    ],
                },
            ],
        },
    ],
});

export default Product;
