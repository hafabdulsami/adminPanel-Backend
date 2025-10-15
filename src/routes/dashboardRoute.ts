import { Router } from "express";
import { getDashboardDataController } from "../controllers/dashbaordController";
// If you have JWT auth middleware:
import { authenticate } from "../middlewares/authMiddleware";
const router = Router();

// ✅ Protected routes (require login)
router.get("/", authenticate, getDashboardDataController);

export default router;
