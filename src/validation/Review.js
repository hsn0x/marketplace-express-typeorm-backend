import Ajv from "ajv";

const ajv = new Ajv();

const CreateReviewSchema = {
    type: "object",
    properties: {
        rate: { type: "number" },
        title: { type: "string" },
        content: { type: "string" },
        UserId: { type: "number" },
    },
    required: ["rate", "title", "content", "UserId"],
    additionalProperties: false,
};

const UpdateReviewSchema = {
    type: "object",
    properties: {
        rate: { type: "number" },
        title: { type: "string" },
        content: { type: "string" },
        UserId: { type: "number" },
    },
    required: ["rate", "title", "content", "UserId"],
    additionalProperties: false,
};

export const validateCreateReview = (reviewData) => {
    const valid = ajv.validate(CreateReviewSchema, reviewData);
    if (!valid)
        return {
            valid,
            errors: ajv.errors,
        };
    return { valid };
};
export const validateUpdateReview = (reviewData) => {
    const valid = ajv.validate(UpdateReviewSchema, reviewData);
    if (!valid)
        return {
            valid,
            errors: ajv.errors,
        };
    return { valid };
};
