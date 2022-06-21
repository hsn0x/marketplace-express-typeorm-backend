import { Market, Product, User } from "../models/index.js";

Product.belongsTo(Market, {
    foreignKey: {
        allowNull: false,
    },
});
Product.belongsTo(User, {
    foreignKey: {
        allowNull: false,
    },
});

export default Product;
