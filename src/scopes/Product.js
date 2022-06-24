import UserSensitiveData from "../constants/SensitiveData.js";

import { Market, Product, Image, User } from "../models/index.js";

Product.addScope("withAssociations", {
    include: [
        {
            model: User,
            attributes: {
                exclude: [...UserSensitiveData],
            },
        },
        { model: Market },
        { model: Image },
    ],
});

export default Product;
