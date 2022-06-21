import Sequelize from "sequelize";
import sequelize from "../db/connection.js";
import { STRING } from "../db/dataTypes.js";
import Market from "./Market.js";
import Product from "./Product.js";

const Category = sequelize.define("Category", {
    name: {
        type: STRING,
        allowNull: false,
    },
    description: {
        type: STRING,
    },
});

export default Category;
