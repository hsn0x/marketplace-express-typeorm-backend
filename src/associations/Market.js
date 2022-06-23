import {
    Avatar,
    Category,
    Image,
    Market,
    Product,
    User,
} from "../models/index.js";

Market.belongsTo(User, {
    foreignKey: {
        allowNull: false,
    },
});
Market.hasMany(Product, {
    foreignKey: {
        allowNull: false,
    },
});
Market.belongsToMany(Category, {
    through: "market_categories",
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
Market.hasMany(Avatar, {
    foreignKey: "avatarableId",
    constraints: false,
    scope: {
        avatarableType: "avatar",
    },
});

export default Market;
