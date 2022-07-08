import { Vote, Product, User } from "../models/index.js";

// belongsToMany
Vote.belongsTo(Product, {
    foreignKey: "voteableId",
    constraints: false,
});

// belongsTo
Vote.belongsTo(User);

export default Vote;
