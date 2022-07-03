import sequelize from "../db/sequelize.js";
import SequelizeSlugify from "sequelize-slugify";

import { Model } from "sequelize";
import { INTEGER, STRING } from "../db/dataTypes.js";

const Category_Categoryable = sequelize.define("Category_Categoryable", {
    categoryId: {
        type: INTEGER,
        unique: "tt_unique_constraint",
    },
    categoryableId: {
        type: INTEGER,
        unique: "tt_unique_constraint",
        references: null,
    },
    categoryableType: {
        type: STRING,
        unique: "tt_unique_constraint",
    },
});

export default Category_Categoryable;
