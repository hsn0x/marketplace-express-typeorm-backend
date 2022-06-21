import { faker } from "@faker-js/faker";
import { Op } from "sequelize";
import sequelize from "../db/connection.js";
import { BOOLEAN, INTEGER, STRING } from "../db/dataTypes.js";

const Student = sequelize.define("Student", {
    name: {
        type: STRING,
        allowNull: false,
        validate: {
            len: [4, 20],
        },
    },
    age: {
        type: INTEGER,
        defaultValue: 21,
    },
    gender: {
        type: STRING,
    },
    favorite_class: {
        type: STRING(250),
        defaultValue: "Computer Science",
    },
    school_year: {
        type: INTEGER,
        allowNull: false,
    },
    subscribed_to_withcode: {
        type: BOOLEAN,
        defaultValue: true,
    },
});

export default Student;
