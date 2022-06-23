import sequelize from "../db/connection.js";
import SequelizeSlugify from "sequelize-slugify";

import { ARRAY, INTEGER, STRING, TEXT } from "../db/dataTypes.js";

const Role = sequelize.define("Role", {
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

SequelizeSlugify.slugifyModel(Role, { source: ["name"] });

export default Role;
