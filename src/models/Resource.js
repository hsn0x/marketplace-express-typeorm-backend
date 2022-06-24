import sequelize from "../db/connection.js";
import SequelizeSlugify from "sequelize-slugify";

import { ARRAY, INTEGER, STRING, TEXT } from "../db/dataTypes.js";

const Resource = sequelize.define("Resource", {
    name: {
        type: STRING,
        allowNull: false,
        unique: true,
    },
    slug: {
        type: STRING,
        allowNull: false,
    },
    description: {
        type: STRING,
    },
});

SequelizeSlugify.slugifyModel(Resource, { source: ["name"] });

export default Resource;
