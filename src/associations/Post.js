import { Post, User } from "../models/index.js";

Post.belongsTo(User, { as: "Author" });

export default Post;
