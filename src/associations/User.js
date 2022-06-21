import { Market, Post, Product, Student, User } from "../models/index.js";

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

export default User;
