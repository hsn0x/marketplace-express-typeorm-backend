import { SENSITIVE_DATA_CONSTANTS } from "../constants/index.js"
import { Vote, Product, Image, User } from "../models/index.js"

Vote.addScope("withAssociations", {
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

export default Vote
