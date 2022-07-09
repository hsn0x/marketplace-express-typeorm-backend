import { Review, Product, User } from "../models/index.js";

Review.belongsTo(Product, {
    foreignKey: "reviewableId",
    constraints: false,
});

// belongsTo
Review.belongsTo(User);

export default Review;
