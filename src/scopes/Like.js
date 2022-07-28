import { SENSITIVE_DATA_CONSTANTS } from "../constants/index.js"
import { Like, Product, Image, User } from "../models/index.js"

Like.addScope("withAssociations", {
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

export default Like
