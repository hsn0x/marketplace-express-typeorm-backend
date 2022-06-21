import sequelize from "../db/connection.js";
import { INTEGER, STRING } from "../db/dataTypes.js";

const Market = sequelize.define("Market", {
    name: {
        type: STRING,
        allowNull: false,
    },
    about: {
        type: STRING,
    },
    slug: {
        type: INTEGER,
    },
});

export default Market;
