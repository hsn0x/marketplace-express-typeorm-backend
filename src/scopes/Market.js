import UserSensitiveData from "../constants/SensitiveData.js";
import { Market, Product, Image, Avatar, User } from "../models/index.js";

Market.addScope("withAssociations", {
    include: [
        {
            model: User,
            attributes: {
                exclude: [...UserSensitiveData],
            },
        },
        { model: Product, include: [{ model: Image }] },
        { model: Image },
        { model: Avatar },
    ],
});

export default Market;
