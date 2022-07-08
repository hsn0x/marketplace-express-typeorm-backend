import { Like, Product, User } from "../models/index.js";

// belongsToMany
Like.belongsTo(Product, {
    foreignKey: "likeableId",
    constraints: false,
});

// belongsTo
Like.belongsTo(User);

export default Like;
