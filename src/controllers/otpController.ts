import { Request, Response } from "express";
import { OTPService } from "../services/otpService";
import { RESPONSE } from "../utils/response";

export const sendOtpController = async (req: Request, res: Response) => {
    try {
        await OTPService.generateOtp(req.body);
        console.log("OTP sent successfully");
        return res.status(RESPONSE.SUCCESS.OTP_SENT.status).json({
            message: RESPONSE.SUCCESS.OTP_SENT.message,
        });
    } catch (error: any) {
        // console.error(error);
        if (error.message == "User not found") {
            console.log("User not found error caught");
            return res.status(404).json({ message: "User not found" });
        }
        return res
            .status(RESPONSE.ERROR.INTERNAL_SERVER_ERROR.status)
            .json({ message: RESPONSE.ERROR.INTERNAL_SERVER_ERROR.message });
    }
};

export const verifyOtpController = async (req: Request, res: Response) => {
    try {
        const isValid = await OTPService.verifyOtp(req.body);
        if (!isValid)
            return res.status(RESPONSE.ERROR.INVALID_OTP.status).json({
                message: RESPONSE.ERROR.INVALID_OTP.message,
            });

        return res.status(RESPONSE.SUCCESS.OTP_VERIFIED.status).json({
            message: RESPONSE.SUCCESS.OTP_VERIFIED.message,
            data: isValid,
        });
    } catch (error: any) {
        console.log(error);
        return res
            .status(RESPONSE.ERROR.INTERNAL_SERVER_ERROR.status)
            .json({ message: RESPONSE.ERROR.INTERNAL_SERVER_ERROR.message });
    }
};
