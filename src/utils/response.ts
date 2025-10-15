// src/constants/response.ts

export const RESPONSE = {
    SUCCESS: {
        OTP_SENT: {
            status: 200,
            message: "OTP sent successfully",
        },
        OTP_VERIFIED: {
            status: 200,
            message: "OTP verified successfully",
        },
        USER_REGISTERED: {
            status: 201,
            message: "User registered successfully",
        },
        LOGIN_SUCCESS: {
            status: 200,
            message: "Login successful",
        },
        PASSWORD_RESET: {
            status: 200,
            message: "Password reset successfully",
        },
    },

    ERROR: {
        EMAIL_REQUIRED: {
            status: 400,
            message: "Email is required",
        },
        OTP_REQUIRED: {
            status: 400,
            message: "Email and OTP are required",
        },
        INVALID_OTP: {
            status: 400,
            message: "Invalid or expired OTP",
        },
        EMAIL_EXISTS: {
            status: 400,
            message: "Email already exists",
        },
        INVALID_CREDENTIALS: {
            status: 400,
            message: "Invalid credentials",
        },
        INTERNAL_SERVER_ERROR: {
            status: 500,
            message: "Internal server error",
        },
    },
};
