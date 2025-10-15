export const sendOtpSchema = {
    type: "object",
    properties: {
        email: { type: "string", format: "email" },
    },
    required: ["email"],
    additionalProperties: false,
};

export const verifyOtpSchema = {
    type: "object",
    properties: {
        otp: { type: "string", pattern: "^[0-9]{6}$" }, // 6 digit OTP
    },
    required: ["otp"],
    additionalProperties: false,
};
