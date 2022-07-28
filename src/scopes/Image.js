import USER_SENSITIVE_DATA_CONSTANTS from "../constants/SensitiveData.js"
import { Image, Product, Image, Avatar, User } from "../models/index.js"

Image.addScope("withAssociations", {
    include: [
        {
            model: User,
            attributes: {
                exclude: [
                    ...SENSITIVE_DATA_CONSTANTS.USER_SENSITIVE_DATA_CONSTANTS,
                ],
            },
        },
        { model: Product, include: [{ model: Image }] },
        { model: Image },
        { model: Avatar },
    ],
})

export default Image
