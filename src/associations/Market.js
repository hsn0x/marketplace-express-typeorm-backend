import {
    Avatar,
    Category,
    Category_Categoryable,
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

Market.belongsToMany(Category, {
    through: {
        model: Category_Categoryable,
        unique: false,
        scope: {
            categoryableType: "market",
        },
    },
    foreignKey: "categoryableId",
    constraints: false,
});

export default Market;
