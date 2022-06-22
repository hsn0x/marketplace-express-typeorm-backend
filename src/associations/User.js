import {
    Avatar,
    Image,
    Market,
    Post,
    Product,
    Student,
    User,
} from "../models/index.js";

User.hasMany(Market, {
    foreignKey: {
        allowNull: false,
    },
});
User.hasMany(Product, {
    foreignKey: {
        allowNull: false,
    },
});
User.hasOne(Student, {
    foreignKey: {
        allowNull: false,
    },
});
User.hasMany(Post, {
    foreignKey: {
        allowNull: false,
    },
});
User.hasMany(Image, {
    foreignKey: "imageableId",
    constraints: false,
    scope: {
        imageableType: "image",
    },
});
User.hasMany(Avatar, {
    foreignKey: "avatarableId",
    constraints: false,
    scope: {
        avatarableType: "avatar",
    },
});

export default User;
