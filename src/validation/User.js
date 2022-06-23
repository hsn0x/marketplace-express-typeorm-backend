import Ajv from "ajv";

const ajv = new Ajv();

const UserSchema = {
    type: "object",
    properties: {
        firstName: { type: "string" },
        lastName: { type: "string" },
        username: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
        passwordHash: { type: "string" },
        passwordSalt: { type: "string" },
        age: { type: "number" },
        gender: { type: "string" },
    },
    required: [
        "firstName",
        "lastName",
        "username",
        "email",
        "password",
        "passwordHash",
        "passwordSalt",
        "age",
        "gender",
    ],
    additionalProperties: false,
};

export const validateUser = (userData) => {
    const valid = ajv.validate(UserSchema, userData);
    console.log({ userData });
    if (!valid)
        return {
            valid,
            errors: ajv.errors,
        };
    return { valid };
};
