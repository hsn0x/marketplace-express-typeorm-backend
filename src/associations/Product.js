import {
    Category,
    Category_Categoryable,
    Image,
    Market,
    Product,
    User,
} from "../models/index.js";

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
Product.belongsToMany(Category, {
    through: {
        model: Category_Categoryable,
        unique: false,
        scope: {
            categoryableType: "product",
        },
    },
    foreignKey: "categoryableId",
    constraints: false,
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
