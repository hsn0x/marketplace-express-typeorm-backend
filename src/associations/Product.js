import { Image, Market, Product, User } from "../models/index.js";

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
Product.hasMany(Image, {
    foreignKey: "imageableId",
    constraints: false,
    scope: {
        imageableType: "image",
    },
});

export default Product;
