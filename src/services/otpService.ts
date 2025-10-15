import { PrismaClient } from "@prisma/client";
import { sendOtpEmail } from "../utils";
import { SendOtpRequestBody, VerifyOtpRequestBody } from "../interfaces/otp";
import { generateToken } from "../utils";
const prisma = new PrismaClient();



export class OTPService {
    static async generateOtp({ email }: SendOtpRequestBody) {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (!existingUser) throw new Error("User not found");
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        // Optional: mark old OTPs as used
        await prisma.otp.updateMany({
            where: { email, used: false },
            data: { used: true },
        });

        await prisma.otp.create({
            data: {
                email,
                code: otp,
                expiresAt,
            },
        });

        await sendOtpEmail(email, otp, expiresAt.toISOString());
    };

    static async verifyOtp({ otp }: VerifyOtpRequestBody) {
        // Step 1: Validate OTP record
        const otpRecord = await prisma.otp.findFirst({
            where: {
                code: otp,
                used: false,
                expiresAt: { gt: new Date() },
            },
        });

        if (!otpRecord) {
            throw new Error("Invalid or expired OTP");
        }

        // Step 2: Mark OTP as used
        await prisma.otp.update({
            where: { id: otpRecord.id },
            data: { used: true },
        });

        // Step 3: Fetch the user
        const user = await prisma.user.findUnique({ where: { email: otpRecord.email } });
        if (!user) {
            throw new Error("User not found");
        }

        // Step 4: Generate token
        const token = generateToken(user.id);

        // Step 5: Return result (omit password before returning)
        const { password, ...userWithoutPassword } = user;

        return {
            user: userWithoutPassword,
            token,
        };
    }
}