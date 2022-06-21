import sequelize from "../db/connection.js";
import { INTEGER, STRING } from "../db/dataTypes.js";

const Product = sequelize.define("Product", {
    title: {
        type: STRING,
        allowNull: false,
    },
    description: {
        type: STRING,
        allowNull: false,
    },
    price: {
        type: INTEGER,
        allowNull: false,
    },
});

export default Product;
