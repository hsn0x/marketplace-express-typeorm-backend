import sequelize from "../db/connection.js";
import { INTEGER, STRING } from "../db/dataTypes.js";

const User = sequelize.define("User", {
    firstName: {
        type: STRING,
        allowNull: false,
    },
    lastName: {
        type: STRING,
        allowNull: false,
    },
    username: {
        type: STRING,
        allowNull: false,
    },
    email: {
        type: STRING,
        allowNull: false,
    },
    passwordHash: {
        type: STRING,
        allowNull: false,
    },
    passwordSalt: {
        type: STRING,
        allowNull: false,
    },
    age: {
        type: INTEGER,
        allowNull: false,
    },
    gender: {
        type: STRING,
        allowNull: false,
    },
});

export default User;
