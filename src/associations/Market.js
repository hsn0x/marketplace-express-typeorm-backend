import { Category, Market, Product, User } from "../models/index.js";

Market.belongsTo(User, {});
Market.hasMany(Product);
Market.belongsToMany(Category, {
    through: "MarketCategories",
});

export default Market;
