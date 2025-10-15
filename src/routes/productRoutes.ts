import { Router } from "express";
import { ProductController } from "../controllers/productControllers";
// If you have JWT auth middleware:
import { authenticate } from "../middlewares/authMiddleware";
import { createProductSchema, updateProductSchema } from "../validations/product";
import { validate } from "../middlewares/validate";
const router = Router();

// ✅ Protected routes (require login)
router.post("/", authenticate, validate(createProductSchema), ProductController.createProduct);
router.get("/", authenticate, ProductController.getAllProducts);
router.get("/:id", authenticate, ProductController.getProductById);
router.put("/:id", authenticate, validate(updateProductSchema), ProductController.updateProduct);
router.delete("/:id", authenticate, ProductController.deleteProduct);

export default router;
