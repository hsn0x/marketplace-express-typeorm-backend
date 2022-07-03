import {
    Avatar,
    Category,
    Category_Categoryable,
    Image,
    Market,
    Product,
    User,
} from "../models/index.js";

// belongsToMany
Category.belongsToMany(Market, {
    through: {
        model: Category_Categoryable,
        unique: false,
    },
    foreignKey: "categoryId",
    constraints: false,
});

Category.belongsToMany(Product, {
    through: {
        model: Category_Categoryable,
        unique: false,
    },
    foreignKey: "categoryId",
    constraints: false,
});

// belongsTo
Category.belongsTo(User);

// hasMany
Category.hasMany(Image, {
    foreignKey: "imageableId",
    constraints: false,
    scope: {
        imageableType: "category",
    },
});
Category.hasMany(Avatar, {
    foreignKey: "avatarableId",
    constraints: false,
    scope: {
        avatarableType: "category",
    },
});

export default Category;
