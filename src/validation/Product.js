import Ajv from "ajv";

const ajv = new Ajv();

const CreateProductSchema = {
    type: "object",
    properties: {
        title: { type: "string" },
        description: { type: "string" },
        price: { type: "number" },
        quantity: { type: "number" },
        MarketId: { type: "number" },
        CategoryId: { type: "array" },
        UserId: { type: "number" },
    },
    required: [
        "title",
        "description",
        "price",
        "quantity",
        "MarketId",
        "CategoryId",
        "UserId",
    ],
    additionalProperties: false,
};

const UpdateProductSchema = {
    type: "object",
    properties: {
        title: { type: "string" },
        description: { type: "string" },
        price: { type: "string" },
        quantity: { type: "number" },
        MarketId: { type: "number" },
        CategoryId: { type: "number" },
        UserId: { type: "number" },
    },
    required: [
        "title",
        "description",
        "price",
        "quantity",
        "MarketId",
        "CategoryId",
        "UserId",
    ],
    additionalProperties: false,
};

export const validateCreateProduct = (productData) => {
    const valid = ajv.validate(CreateProductSchema, productData);
    if (!valid)
        return {
            valid,
            errors: ajv.errors,
        };
    return { valid };
};
export const validateUpdateProduct = (productData) => {
    const valid = ajv.validate(UpdateProductSchema, productData);
    if (!valid)
        return {
            valid,
            errors: ajv.errors,
        };
    return { valid };
};
