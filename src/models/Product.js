import Sequelize from "sequelize";
import sequelize from "../db/connection.js";
import Market from "./Market.js";

const Product = sequelize.define("Product", {
    title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.DataTypes.STRING,
    },
    price: {
        type: Sequelize.DataTypes.INTEGER,
    },
});

export default Product;
