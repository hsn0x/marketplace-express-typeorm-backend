import sequelize from "../db/sequelize.js";

import { INTEGER, STRING, TEXT } from "../db/dataTypes.js";
import { Model } from "sequelize";

class Review extends Model {}
Review.init(
    {
        rate: {
            type: INTEGER,
            allowNull: false,
        },
        title: {
            type: STRING,
            allowNull: false,
        },
        content: {
            type: TEXT,
            allowNull: false,
        },
        reviewableId: { type: INTEGER },
        reviewableType: { type: STRING },
    },
    { sequelize, modelName: "review" }
);

export default Review;
