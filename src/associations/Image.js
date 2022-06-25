import {
    Category,
    Comment,
    Image,
    Market,
    Product,
    User,
} from "../models/index.js";

// belongsTo
Image.belongsTo(User, {
    foreignKey: "imageableId",
    constraints: false,
});
Image.belongsTo(Market, {
    foreignKey: "imageableId",
    constraints: false,
});
Image.belongsTo(Product, {
    foreignKey: "imageableId",
    constraints: false,
});
Image.belongsTo(Category, {
    foreignKey: "imageableId",
    constraints: false,
});

export default Image;
