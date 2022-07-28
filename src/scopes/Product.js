import { SENSITIVE_DATA_CONSTANTS } from "../constants/index.js"

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
} from "../models/index.js"

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
                exclude: [
                    ...SENSITIVE_DATA_CONSTANTS.USER_SENSITIVE_DATA_CONSTANTS,
                ],
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
})

export default Product
