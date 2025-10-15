// src/interfaces/otp.interface.ts

export interface SendOtpRequestBody {
    email: string;
}

export interface VerifyOtpRequestBody {
    email: string;
    otp: string;
}

export interface OtpRecord {
    id: number;
    email: string;
    code: string;
    expiresAt: Date;
    used: boolean;
    createdAt: Date;
}
