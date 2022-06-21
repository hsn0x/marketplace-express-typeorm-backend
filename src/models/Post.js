import sequelize from "../db/connection.js";
import { STRING } from "../db/dataTypes.js";

const Post = sequelize.define("Post", {
    title: {
        type: STRING,
        allowNull: false,
    },
    content: {
        type: STRING,
        allowNull: false,
    },
});

export default Post;
