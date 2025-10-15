import { prisma } from "../config/prisma";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils";
import { RegisterCredentials, LoginResult, LoginCredentials } from "../interfaces/auth";

export class AuthService {
    static async register(credentials: RegisterCredentials): Promise<LoginResult> {
        const { name, email, password } = credentials;
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) throw new Error("Email already exists");

        const hashed = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { name, email, password: hashed },
        });

        const token = generateToken(user.id);
        return { user, token };
    }

    static async login(credentials: LoginCredentials): Promise<LoginResult> {
        const { email, password } = credentials;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error("Invalid credentials");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid credentials");

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

}
