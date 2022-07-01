import UserSensitiveData from "../constants/SensitiveData.js";
import { Image, Product, Image, Avatar, User } from "../models/index.js";

Image.addScope("withAssociations", {
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

export default Image;
