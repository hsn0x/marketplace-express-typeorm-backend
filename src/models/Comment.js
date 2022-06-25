import { Model } from "sequelize";
import sequelize from "../db/sequelize.js";
import { INTEGER, STRING, TEXT } from "../db/dataTypes.js";
import { uppercaseFirst } from "../utils/index.js";

class Comment extends Model {
    getCommentable(options) {
        if (!this.commentableType) return Promise.resolve(null);
        const mixinMethodName = `get${uppercaseFirst(this.commentableType)}`;
        return this[mixinMethodName](options);
    }
}

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

Comment.addHook("afterFind", (findResult) => {
    if (!Array.isArray(findResult)) findResult = [findResult];
    for (const instance of findResult) {
        if (
            instance.commentableType === "image" &&
            instance.image !== undefined
        ) {
            instance.commentable = instance.image;
        } else if (
            instance.commentableType === "video" &&
            instance.video !== undefined
        ) {
            instance.commentable = instance.video;
        }
        // To prevent mistakes:
        delete instance.image;
        delete instance.dataValues.image;
        delete instance.video;
        delete instance.dataValues.video;
    }
});

export default Comment;
