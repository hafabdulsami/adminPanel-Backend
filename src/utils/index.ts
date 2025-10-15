import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function sendOtpEmail(to: string, otp: string, expiresAtISO: string) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: "Your verification code (OTP)",
        text: `Your OTP is ${otp}. It will expire at ${expiresAtISO}. If you didn't request this, ignore this email.`,
        html: `<p>Your OTP is <strong>${otp}</strong>.</p>
           <p>It will expire at <strong>${expiresAtISO}</strong>.</p>
           <p>If you didn't request this, you can safely ignore this email.</p>`,
    };

    return transporter.sendMail(mailOptions);
}

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const generateToken = (id: number) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET);
};

export const generateOtp = (): string => {
    return (crypto.randomInt(100000, 999999)).toString();
};

