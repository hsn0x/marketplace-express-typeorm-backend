import {
    Avatar,
    Category,
    Favorite,
    Image,
    Like,
    Market,
    Post,
    Product,
    Role,
    Student,
    User,
    Vote,
} from "../models/index.js";

// hasMany
User.hasMany(Market, {
    foreignKey: {
        allowNull: false,
    },
});
User.hasMany(Category, {
    foreignKey: {
        allowNull: false,
    },
});
User.hasMany(Product, {
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
        imageableType: "user",
    },
});
User.hasMany(Avatar, {
    foreignKey: "avatarableId",
    constraints: false,
    scope: {
        avatarableType: "user",
    },
});
User.hasMany(Like, {
    foreignKey: {
        allowNull: false,
    },
});
User.hasMany(Vote, {
    foreignKey: {
        allowNull: false,
    },
});
User.hasMany(Favorite, {
    foreignKey: {
        allowNull: false,
    },
});
// hasOne
User.hasOne(Student, {
    foreignKey: {
        allowNull: false,
    },
});

// belongsToMany
User.belongsToMany(Role, {
    through: "user_roles",
});

export default User;
