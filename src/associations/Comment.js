import { Comment, Image, Product, User } from "../models/index.js";

Comment.belongsTo(Product, {
    foreignKey: "commentableId",
    constraints: false,
});

// belongsTo
Comment.belongsTo(User);

export default Comment;
