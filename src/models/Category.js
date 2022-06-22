import sequelize from "../db/connection.js";
import { STRING } from "../db/dataTypes.js";

const Category = sequelize.define("Category", {
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
    },
});

export default Category;
