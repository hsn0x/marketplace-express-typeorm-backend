import { Post, User } from "../models/index.js";

Post.belongsTo(User, {
    foreignKey: {
        allowNull: false,
    },
});

export default Post;
