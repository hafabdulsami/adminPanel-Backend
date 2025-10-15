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
        PRODUCT_CREATED: {
            status: 201,
            message: "Product created successfully",
        },
        PRODUCTS_FETCHED: {
            status: 200,
            message: "All products fetched successfully",
        },
        DASHBOARD_DATA: {
            status: 200,
            message: "Dashboard data fetched successfully",
        },
        PRODUCT_FETCHED: {
            status: 200,
            message: "Product fetched successfully",
        },
        PRODUCT_UPDATED: {
            status: 200,
            message: "Product updated successfully",
        },
        PRODUCT_DELETED: {
            status: 200,
            message: "Product deleted successfully",
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
        USER_NOT_FOUND: {
            status: 404,
            message: "User not found",
        },
        PRODUCT_NOT_FOUND: {
            status: 404,
            message: "Product not found",
        },
        DASHBOARD_NOT_FOUND: {
            status: 404,
            message: "Dashboard data not found",
        }
    },
};
