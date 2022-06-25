import {
    Avatar,
    Category,
    Image,
    Market,
    Product,
    User,
} from "../models/index.js";

// belongsToMany
Category.belongsTo(Market, {
    foreignKey: "categoryableId",
    constraints: false,
});

Category.belongsTo(Product, {
    foreignKey: "categoryableId",
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
