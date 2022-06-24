import Ajv from "ajv";

const ajv = new Ajv();

const CreateMarketSchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        username: { type: "string" },
        title: { type: "string" },
        about: { type: "string" },
        UserId: { type: "number" },
    },
    required: ["name", "username", "title", "about", "UserId"],
    additionalProperties: false,
};

const UpdateMarketSchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        username: { type: "string" },
        title: { type: "string" },
        about: { type: "string" },
        UserId: { type: "number" },
    },
    required: ["name", "username", "title", "about", "UserId"],
    additionalProperties: false,
};

export const validateCreateMarket = (marketData) => {
    const valid = ajv.validate(CreateMarketSchema, marketData);
    if (!valid)
        return {
            valid,
            errors: ajv.errors,
        };
    return { valid };
};
export const validateUpdateMarket = (marketData) => {
    const valid = ajv.validate(UpdateMarketSchema, marketData);
    if (!valid)
        return {
            valid,
            errors: ajv.errors,
        };
    return { valid };
};
