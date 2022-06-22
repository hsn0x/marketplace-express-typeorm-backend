import sequelize from "../db/connection.js";
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

export default Market;
