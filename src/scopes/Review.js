import { SENSITIVE_DATA_CONSTANTS } from "../constants/index.js"
import {
    Review,
    Product,
    Image,
    Avatar,
    User,
    Category,
} from "../models/index.js"

Review.addScope("withAssociations", {
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

export default Review
