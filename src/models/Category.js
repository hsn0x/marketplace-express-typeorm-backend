import sequelize from "../db/connection.js";
import SequelizeSlugify from "sequelize-slugify";

import { STRING } from "../db/dataTypes.js";

const Category = sequelize.define("Category", {
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
});
SequelizeSlugify.slugifyModel(Category, { source: ["name"] });

export default Category;
