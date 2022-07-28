import { SENSITIVE_DATA_CONSTANTS } from "../constants/index.js"
import { Favorite, Product, Image, User } from "../models/index.js"

Favorite.addScope("withAssociations", {
    include: [
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
            include: [{ model: Image }],
        },
    ],
})

export default Favorite
