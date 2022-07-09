import {
    Category,
    Category_Categoryable,
    Comment,
    Favorite,
    Image,
    Like,
    Market,
    Product,
    Review,
    User,
    Vote,
} from "../models/index.js";

// belongsTo
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
// belongsToMany
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
Product.hasMany(Like, {
    foreignKey: "likeableId",
    constraints: false,
    scope: {
        likeableType: "product",
    },
});
Product.hasMany(Vote, {
    foreignKey: "voteableId",
    constraints: false,
    scope: {
        voteableType: "product",
    },
});
Product.hasMany(Favorite, {
    foreignKey: "favoriteableId",
    constraints: false,
    scope: {
        favoriteableType: "product",
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
Product.hasMany(Comment, {
    foreignKey: "commentableId",
    constraints: false,
    scope: {
        commentableType: "product",
    },
});
Product.hasMany(Review, {
    foreignKey: "reviewableId",
    constraints: false,
    scope: {
        reviewableType: "product",
    },
});

export default Product;
