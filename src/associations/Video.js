import { Video, Market, Product, User, Comment } from "../models/index.js";

Video.belongsTo(User, {});
Video.belongsTo(Market, {});
Video.belongsTo(Product, {});
Video.hasMany(Comment, {
    foreignKey: "commentableId",
    constraints: false,
    scope: {
        commentableType: "video",
    },
});

export default Video;
