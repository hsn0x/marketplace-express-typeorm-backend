import Sequelize from "sequelize";
import sequelize from "../db/connection.js";
import Category from "./Category.js";
import Product from "./Product.js";

const Market = sequelize.define("Market", {
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    about: {
        type: Sequelize.DataTypes.STRING,
    },
    slug: {
        type: Sequelize.DataTypes.INTEGER,
    },
});

export default Market;
