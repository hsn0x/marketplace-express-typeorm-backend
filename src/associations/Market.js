import {
    Avatar,
    Category,
    Image,
    Market,
    Product,
    User,
} from "../models/index.js";

// belongsTo
Market.belongsTo(User, {
    foreignKey: {
        allowNull: false,
    },
});

// hasMany
Market.hasMany(Product, {
    foreignKey: {
        allowNull: false,
    },
});
Market.hasMany(Image, {
    foreignKey: "imageableId",
    constraints: false,
    scope: {
        imageableType: "market",
    },
});
Market.hasMany(Avatar, {
    foreignKey: "avatarableId",
    constraints: false,
    scope: {
        avatarableType: "market",
    },
});
Market.hasMany(Category, {
    foreignKey: "categoryableId",
    constraints: false,
    scope: {
        imageableType: "market",
    },
});

export default Market;
