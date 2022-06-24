import { Category, Market, Product } from "../models/index.js";

// belongsToMany
Category.belongsToMany(Market, {
    through: "market_categories",
    foreignKey: {
        allowNull: false,
    },
});

// hasMany
Category.hasMany(Product, {
    foreignKey: {
        allowNull: false,
    },
});

export default Category;
