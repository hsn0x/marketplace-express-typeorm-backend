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
Market.hasMany(Avatar, {
    foreignKey: "avatarableId",
    constraints: false,
    scope: {
        avatarableType: "avatar",
    },
});
Market.hasMany(Product, {
    foreignKey: {
        allowNull: false,
    },
});
Market.hasMany(Image, {
    foreignKey: "imageableId",
    constraints: false,
    scope: {
        imageableType: "image",
    },
});

// belongsToMany
Market.belongsToMany(Category, {
    through: "market_categories",
    foreignKey: {
        allowNull: false,
    },
});

export default Market;
