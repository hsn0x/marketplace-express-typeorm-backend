import { SENSITIVE_DATA_CONSTANTS } from "../constants/index.js"
import {
    Market,
    Product,
    Image,
    Avatar,
    User,
    Category,
    Like,
    Vote,
    Favorite,
} from "../models/index.js"

Market.addScope("withAssociations", {
    include: [
        {
            model: Category,
        },
        {
            model: User,
            attributes: {
                exclude: [
                    ...SENSITIVE_DATA_CONSTANTS.USER_SENSITIVE_DATA_CONSTANTS,
                ],
            },
        },
        {
            model: Product,
            separate: true,
            include: [
                {
                    model: Image,
                },
                {
                    model: Like,
                },
                {
                    model: Vote,
                },
                {
                    model: Favorite,
                },
            ],
        },
        {
            model: Image,
            separate: true,
        },
        { model: Avatar, separate: true },
    ],
})

export default Market
