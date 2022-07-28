import { SENSITIVE_DATA_CONSTANTS } from "../constants/index.js"

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
} from "../models/index.js"

import {} from "./index.js"

User.addScope("withoutPassword", {
    attributes: {
        exclude: [...SENSITIVE_DATA_CONSTANTS.USER_SENSITIVE_DATA_CONSTANTS],
    },
})

User.addScope("withAssociations", {
    include: [
        {
            model: Market,
            separate: true,
            include: [
                {
                    model: Avatar,
                    separate: true,
                },
                {
                    model: Image,
                    separate: true,
                },
            ],
        },
        {
            model: Product,
            separate: true,
            include: [
                {
                    model: Image,
                    separate: true,
                },
                {
                    model: Market,
                    include: [
                        {
                            model: Avatar,
                            separate: true,
                        },
                        {
                            model: Image,
                            separate: true,
                        },
                    ],
                },
                {
                    model: Like,
                    separate: true,
                },
                {
                    model: Vote,
                    separate: true,
                },
                {
                    model: Favorite,
                    separate: true,
                },
            ],
        },
        {
            model: Image,
            separate: true,
        },
        {
            model: Avatar,
            separate: true,
        },
        {
            model: Role,
        },
        {
            model: Like,
            separate: true,
        },
        {
            model: Vote,
            separate: true,
        },
        {
            model: Favorite,
            separate: true,
        },
        {
            model: Comment,
            separate: true,
        },
        {
            model: Review,
            separate: true,
        },
    ],
})

export default User
