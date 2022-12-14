import sequelize from "../db/sequelize.js";

import { INTEGER, STRING, TEXT } from "../db/dataTypes.js";
import { Model } from "sequelize";

class Comment extends Model {}
Comment.init(
    {
        title: {
            type: STRING,
            allowNull: false,
        },
        content: {
            type: TEXT,
            allowNull: false,
        },
        commentableId: { type: INTEGER },
        commentableType: { type: STRING },
    },
    { sequelize, modelName: "comment" }
);

export default Comment;
