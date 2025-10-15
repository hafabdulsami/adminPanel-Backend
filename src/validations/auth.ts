export const registerSchema = {
    type: "object",
    properties: {
        name: { type: "string", minLength: 2 },
        email: { type: "string", format: "email" },
        password: { type: "string", minLength: 6 },
    },
    required: ["name", "email", "password"],
    additionalProperties: false,
};

export const loginSchema = {
    type: "object",
    properties: {
        email: { type: "string", format: "email" },
        password: { type: "string", minLength: 6 },
    },
    required: ["email", "password"],
    additionalProperties: false,
};

export const resetPasswordSchema = {
    type: "object",
    properties: {
        password: { type: "string", minLength: 6 },
    },
    required: ["password"],
    additionalProperties: false,
};
