import { Favorite, Product, User } from "../models/index.js";

// belongsToMany
Favorite.belongsTo(Product, {
    foreignKey: "favoriteableId",
    constraints: false,
});

// belongsTo
Favorite.belongsTo(User);

export default Favorite;
