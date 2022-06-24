import sequelize from "../db/connection.js";
import SequelizeSlugify from "sequelize-slugify";

import { ARRAY, INTEGER, STRING, TEXT } from "../db/dataTypes.js";

const Product = sequelize.define("Product", {
    title: {
        type: STRING,
        allowNull: false,
    },
    slug: {
        type: STRING,
        unique: true,
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

SequelizeSlugify.slugifyModel(Product, { source: ["title"] });

export default Product;
