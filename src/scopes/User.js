import UserSensitiveData from "../constants/SensitiveData.js";

import {
    Image,
    Market,
    Product,
    Avatar,
    Role,
    Student,
    User,
} from "../models/index.js";

import {} from "./index.js";

User.addScope("withoutPassword", {
    attributes: {
        exclude: [...UserSensitiveData],
    },
});

User.addScope("withAssociations", {
    include: [Market, Product, Image, Avatar, Role],
});

export default User;
