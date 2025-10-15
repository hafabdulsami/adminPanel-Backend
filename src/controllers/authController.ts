import { Request, Response } from "express";
import { AuthService } from "../services/authServices";
import { RESPONSE } from "../utils/response";
import { AuthenticatedRequest } from "../interfaces/auth";
export class AuthController {
    static async register(req: Request, res: Response) {
        try {
            const data = await AuthService.register(req.body);

            return res.status(RESPONSE.SUCCESS.USER_REGISTERED.status).json({
                message: RESPONSE.SUCCESS.USER_REGISTERED.message,
                data,
            });
        } catch (err: any) {
            const message =
                err.message === "Email already exists"
                    ? RESPONSE.ERROR.EMAIL_EXISTS
                    : RESPONSE.ERROR.INTERNAL_SERVER_ERROR;

            return res.status(message.status).json({ message: message.message });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const data = await AuthService.login(req.body);

            return res.status(RESPONSE.SUCCESS.LOGIN_SUCCESS.status).json({
                message: RESPONSE.SUCCESS.LOGIN_SUCCESS.message,
                data,
            });
        } catch (err: any) {
            const message =
                err.message === "Invalid credentials"
                    ? RESPONSE.ERROR.INVALID_CREDENTIALS
                    : RESPONSE.ERROR.INTERNAL_SERVER_ERROR;

            return res.status(message.status).json({ message: message.message });
        }
    }

    static async resetPassword(req: AuthenticatedRequest, res: Response) {
        try {
            const userId = req.userId; // set by authenticate middleware
            const { password } = req.body;

            if (!userId) {
                return res.status(401).json({ message: "Unauthorized: Missing user ID" });
            }

            await AuthService.resetPassword(userId, password);

            return res.status(RESPONSE.SUCCESS.PASSWORD_RESET.status).json({
                message: RESPONSE.SUCCESS.PASSWORD_RESET.message,
            });
        } catch (error) {
            console.error(error);
            return res
                .status(RESPONSE.ERROR.INTERNAL_SERVER_ERROR.status)
                .json({ message: RESPONSE.ERROR.INTERNAL_SERVER_ERROR.message });
        }
    }

}
