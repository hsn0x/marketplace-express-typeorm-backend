import sequelize from "../db/connection.js";
import { faker } from "@faker-js/faker";
import { BOOLEAN, INTEGER, STRING } from "../db/dataTypes.js";
import Market from "./Market.js";
import Product from "./Product.js";
import Student from "./Student.js";

const User = sequelize.define("User", {
    firstName: {
        type: STRING,
        allowNull: true,
    },
    lastName: {
        type: STRING,
        // allowNull defaults to true
    },
    username: {
        type: STRING,
        allowNull: false,
    },
    email: {
        type: STRING,
    },
    password: {
        type: STRING,
    },
    age: {
        type: INTEGER,
        defaultValue: 21,
    },
    gender: {
        type: STRING,
    },
    isAdmin: {
        type: BOOLEAN,
        defaultValue: false,
    },
});

export default User;
