import sequelize from "../db/sequelize.js";
import SequelizeSlugify from "sequelize-slugify";

import { INTEGER, STRING } from "../db/dataTypes.js";
import { Model } from "sequelize";

class Category extends Model {}

Category.init(
    {
        name: {
            type: STRING,
            allowNull: false,
        },
        slug: {
            type: STRING,
        },
        description: {
            type: STRING,
        },
        categoryableId: { type: INTEGER },
        categoryableType: { type: STRING },
    },
    { sequelize, modelName: "category" }
);

export default Category;
