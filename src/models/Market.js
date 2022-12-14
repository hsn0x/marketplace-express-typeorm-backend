import sequelize from "../db/sequelize.js";
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
        unique: true,
    },
    title: {
        type: STRING,
    },
    about: {
        type: TEXT,
    },
    description: {
        type: TEXT,
    },
});
SequelizeSlugify.slugifyModel(Market, { source: ["name"] });

export default Market;
