import { Category, Market, Product, User } from "../models/index.js";

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
    through: "MarketCategories",

    foreignKey: {
        allowNull: false,
    },
});

export default Market;
