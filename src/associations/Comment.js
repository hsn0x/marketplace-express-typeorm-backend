import { Comment, Image, Video } from "../models/index.js";

Comment.belongsTo(Image, {
    foreignKey: "commentableId",
    constraints: false,
});
Comment.belongsTo(Video, {
    foreignKey: "commentableId",
    constraints: false,
});

export default Comment;
