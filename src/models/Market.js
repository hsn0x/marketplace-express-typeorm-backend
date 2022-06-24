import sequelize from "../db/connection.js";
import SequelizeSlugify from "sequelize-slugify";

import { INTEGER, STRING, TEXT } from "../db/dataTypes.js";

const Market = sequelize.define("Market", {
    name: {
        type: STRING,
        allowNull: false,
    },
    username: {
        type: STRING,
        allowNull: false,
        unique: true,
    },
    slug: {
        type: STRING,
    },
    about: {
        type: TEXT,
    },
    title: {
        type: STRING,
    },
});
SequelizeSlugify.slugifyModel(Market, { source: ["name"] });

export default Market;
