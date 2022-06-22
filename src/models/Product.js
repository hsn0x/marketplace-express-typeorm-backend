import sequelize from "../db/connection.js";
import { INTEGER, STRING, TEXT } from "../db/dataTypes.js";

const Product = sequelize.define("Product", {
    title: {
        type: STRING,
        allowNull: false,
    },
    slug: {
        type: STRING,
        allowNull: false,
    },
    description: {
        type: TEXT,
        allowNull: false,
    },
    price: {
        type: INTEGER,
        allowNull: false,
    },
});

export default Product;
