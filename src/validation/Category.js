import Ajv from "ajv";

const ajv = new Ajv();

const CreateCategorySchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        description: { type: "string" },
        parentId: { type: "number" },
        UserId: { type: "number" },
    },
    required: ["name", "description", "UserId"],
    additionalProperties: false,
};

const UpdateCategorySchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        description: { type: "string" },
        parentId: { type: "number" },
        UserId: { type: "number" },
    },
    required: ["name", "description", "UserId"],
    additionalProperties: false,
};

export const validateCreateCategory = (categoryData) => {
    const valid = ajv.validate(CreateCategorySchema, categoryData);
    if (!valid)
        return {
            valid,
            errors: ajv.errors,
        };
    return { valid };
};
export const validateUpdateCategory = (categoryData) => {
    const valid = ajv.validate(UpdateCategorySchema, categoryData);
    if (!valid)
        return {
            valid,
            errors: ajv.errors,
        };
    return { valid };
};
