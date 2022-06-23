import sequelize from "../db/connection.js";
import SequelizeSlugify from "sequelize-slugify";

import { INTEGER, STRING, TEXT } from "../db/dataTypes.js";

const Market = sequelize.define("Market", {
    name: {
        type: STRING,
        allowNull: false,
    },
    slug: {
        type: STRING,
        allowNull: false,
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
