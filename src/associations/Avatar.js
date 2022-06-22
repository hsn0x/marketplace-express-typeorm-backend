import { Comment, Avatar, Market, Product, User } from "../models/index.js";

Avatar.belongsTo(User, {
    foreignKey: "avatarableId",
    constraints: false,
});
Avatar.belongsTo(Market, {
    foreignKey: "avatarableId",
    constraints: false,
});

export default Avatar;
