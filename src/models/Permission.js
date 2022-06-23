import sequelize from "../db/connection.js";
import SequelizeSlugify from "sequelize-slugify";

import { ARRAY, INTEGER, STRING, TEXT } from "../db/dataTypes.js";

const Permission = sequelize.define("Permission", {
    name: {
        type: STRING,
        allowNull: false,
    },
    slug: {
        type: STRING,
        allowNull: false,
    },
    description: {
        type: STRING,
        unique: true,
    },
});

SequelizeSlugify.slugifyModel(Permission, { source: ["name"] });

export default Permission;
