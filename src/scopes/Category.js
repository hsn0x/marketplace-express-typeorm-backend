import { SENSITIVE_DATA_CONSTANTS } from "../constants/index.js"
import { Market, Category, Image, User } from "../models/index.js"

Category.addScope("withAssociations", {
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
            model: Market,
        },
        {
            model: Image,
            separate: true,
        },
    ],
})

export default Category
