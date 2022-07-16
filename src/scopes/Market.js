import UserSensitiveData from "../constants/SensitiveData.js";
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
} from "../models/index.js";

Market.addScope("withAssociations", {
    include: [
        {
            model: Category,
        },
        {
            model: User,
            attributes: {
                exclude: [...UserSensitiveData],
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
});

export default Market;
