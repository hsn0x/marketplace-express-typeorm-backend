import Ajv from "ajv"

const ajv = new Ajv()

const CreateVoteSchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        username: { type: "string" },
        title: { type: "string" },
        description: { type: "string" },
        about: { type: "string" },
        CategoriesIds: {
            type: "array",
            items: {
                type: "number",
            },
        },
        UserId: { type: "number" },
    },
    required: [
        "name",
        "username",
        "title",
        "description",
        "about",
        "CategoriesIds",
        "UserId",
    ],
    additionalProperties: false,
}

const UpdateVoteSchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        username: { type: "string" },
        title: { type: "string" },
        description: { type: "string" },
        about: { type: "string" },
        CategoriesIds: {
            type: "array",
            items: {
                type: "number",
            },
        },
        UserId: { type: "number" },
    },
    required: [
        "name",
        "username",
        "title",
        "description",
        "about",
        "CategoriesIds",
        "UserId",
    ],
    additionalProperties: false,
}

export default {
    validateCreate: async (voteData) => {
        const valid = ajv.validate(CreateVoteSchema, voteData)
        if (!valid)
            return {
                valid,
                errors: ajv.errors,
            }
        return { valid }
    },
    validateUpdateVote: async (voteData) => {
        const valid = ajv.validate(UpdateVoteSchema, voteData)
        if (!valid)
            return {
                valid,
                errors: ajv.errors,
            }
        return { valid }
    },
}
