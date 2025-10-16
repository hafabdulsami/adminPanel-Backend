import express from "express";
import { AuthController } from "../controllers/authController";
import { sendOtpController, verifyOtpController } from "../controllers/otpController";
import { validate } from "../middlewares/validate";
import { registerSchema, loginSchema, resetPasswordSchema } from "../validations/auth";
import { sendOtpSchema, verifyOtpSchema } from "../validations/otp";
import { authenticate } from "../middlewares/authMiddleware";
const router = express.Router();

router.post("/register", validate(registerSchema), AuthController.register);
router.post("/login", validate(loginSchema), AuthController.login);
router.post("/send-otp", validate(sendOtpSchema), sendOtpController);
router.post("/verify-otp", validate(verifyOtpSchema), verifyOtpController);
router.post("/reset-password", validate(resetPasswordSchema), authenticate, AuthController.resetPassword);
router.post("/verify-email", validate(verifyOtpSchema), AuthController.verifyEmail);
export default router;
