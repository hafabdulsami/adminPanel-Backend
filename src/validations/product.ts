export const createProductSchema = {
    type: "object",
    properties: {
        name: { type: "string", minLength: 2, maxLength: 100 },
        price: { type: "number", minimum: 0 },
        category: { type: "string", minLength: 2, maxLength: 100 },
    },
    required: ["name", "price", "category"],
    additionalProperties: false,
};
export const updateProductSchema = {
    type: "object",
    properties: {
        name: { type: "string", minLength: 2, maxLength: 100 },
        price: { type: "number", minimum: 0 },
        category: { type: "string", minLength: 2, maxLength: 100 },
    },
    additionalProperties: false,
};
