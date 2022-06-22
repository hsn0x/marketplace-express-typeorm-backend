import { Comment, Image, Market, Product, User } from "../models/index.js";

// Image
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

export default Image;
