import { Category, Image, Market, Product, User } from "../models/index.js";

//
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
Product.hasMany(Category, {
    foreignKey: "categoryableId",
    constraints: false,
    scope: {
        imageableType: "product",
    },
});

// hasMany
Product.hasMany(Image, {
    foreignKey: "imageableId",
    constraints: false,
    scope: {
        imageableType: "product",
    },
});

export default Product;
