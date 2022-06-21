import { Category, Market, Product } from "../models/index.js";

Category.belongsToMany(Market, {
    through: "MarketCategories",

    foreignKey: {
        allowNull: false,
    },
});
Category.hasMany(Product, {
    foreignKey: {
        allowNull: false,
    },
});

export default Category;
