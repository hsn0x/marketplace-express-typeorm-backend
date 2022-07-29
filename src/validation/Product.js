import Ajv from "ajv"

const ajv = new Ajv()

const createSchema = {
    type: "object",
    properties: {
        title: { type: "string" },
        description: { type: "string" },
        price: { type: "number" },
        quantity: { type: "number" },
        MarketId: { type: "number" },
        CategoriesIds: {
            type: "array",
            items: {
                type: "number",
            },
        },
        UserId: { type: "number" },
    },
    required: [
        "title",
        "description",
        "price",
        "quantity",
        "MarketId",
        "CategoriesIds",
        "UserId",
    ],
    additionalProperties: false,
}

const updateSchema = {
    type: "object",
    properties: {
        title: { type: "string" },
        description: { type: "string" },
        price: { type: "number" },
        quantity: { type: "number" },
        MarketId: { type: "number" },
        CategoriesIds: {
            type: "array",
            items: {
                type: "number",
            },
        },
        UserId: { type: "number" },
    },
    required: [
        "title",
        "description",
        "price",
        "quantity",
        "MarketId",
        "CategoriesIds",
        "UserId",
    ],
    additionalProperties: false,
}

export default {
    validatecreate: async (productData) => {
        const valid = ajv.validate(createSchema, productData)
        if (!valid)
            return {
                valid,
                errors: ajv.errors,
            }
        return { valid }
    },
    validateupdate: async (productData) => {
        const valid = ajv.validate(updateSchema, productData)
        if (!valid)
            return {
                valid,
                errors: ajv.errors,
            }
        return { valid }
    },
}
