import { prisma } from "../config/prisma";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils";
import { RegisterCredentials, LoginResult, LoginCredentials } from "../interfaces/auth";
import { OTPService } from "./otpService";
export class AuthService {
    static async register(credentials: RegisterCredentials) {
        const { name, email, password } = credentials;
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) throw new Error("Email already exists");

        const hashed = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { name, email, password: hashed },
        });
        await OTPService.generateOtp({ email });
        const token = generateToken(user.id);
    }

    static async login(credentials: LoginCredentials): Promise<LoginResult> {
        const { email, password } = credentials;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error("Invalid credentials");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid credentials");
        const verified = user.verified;
        if (!verified) throw new Error("Please verify your email to login");
        // Generate JWT
        const token = generateToken(user.id);
        const { password: _password, ...userWithoutPassword } = user;

        return { user: userWithoutPassword, token };
    }
    static async resetPassword(userId: number, newPassword: string) {
        const hashed = await bcrypt.hash(newPassword, 10);

        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!existingUser) {
            throw new Error("User not found");
        }

        await prisma.user.update({
            where: { id: userId },
            data: { password: hashed },
        });

        return true;
    }
    static async verifyUser(OTP: string) {
        const otpRecord = await prisma.otp.findFirst({
            where: {
                code: OTP,
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
        const user = await prisma.user.findUnique({ where: { email: otpRecord.email } });
        if (!user) {
            throw new Error("User not found");
        }
        const m = await prisma.user.update({
            where: { id: user.id },
            data: { verified: true },
        });
        return true;
    }
}
