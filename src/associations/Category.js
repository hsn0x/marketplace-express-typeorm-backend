import { Category, Market, Product } from "../models/index.js";

Category.belongsToMany(Market, {
    through: "MarketCategories",
});
Category.hasMany(Product);

export default Category;
