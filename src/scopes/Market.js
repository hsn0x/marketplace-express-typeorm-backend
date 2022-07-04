import UserSensitiveData from "../constants/SensitiveData.js";
import {
    Market,
    Product,
    Image,
    Avatar,
    User,
    Category,
} from "../models/index.js";

Market.addScope("withAssociations", {
    include: [
        { model: Category },
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
        { model: Image },
        { model: Avatar },
    ],
});

export default Market;
