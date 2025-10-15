import { Request, Response } from "express";
import { ProductService } from "../services/productServices";
import { RESPONSE } from "../utils/response";
import { AuthenticatedRequest } from "../interfaces/auth";
export class ProductController {
    static async createProduct(req: AuthenticatedRequest, res: Response) {
        try {
            const userId = req.userId;
            const data = await ProductService.createProduct(req.body, userId);

            return res.status(RESPONSE.SUCCESS.PRODUCT_CREATED.status).json({
                message: RESPONSE.SUCCESS.PRODUCT_CREATED.message,
                data,
            });
        } catch (err: any) {
            return res.status(RESPONSE.ERROR.INTERNAL_SERVER_ERROR.status).json({
                message: err.message || RESPONSE.ERROR.INTERNAL_SERVER_ERROR.message,
            });
        }
    }

    static async getAllProducts(req: Request, res: Response) {
        try {
            const data = await ProductService.getAllProducts();

            return res.status(RESPONSE.SUCCESS.PRODUCTS_FETCHED.status).json({
                message: RESPONSE.SUCCESS.PRODUCTS_FETCHED.message,
                data,
            });
        } catch (err: any) {
            return res.status(RESPONSE.ERROR.INTERNAL_SERVER_ERROR.status).json({
                message: err.message || RESPONSE.ERROR.INTERNAL_SERVER_ERROR.message,
            });
        }
    }

    static async getProductById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const data = await ProductService.getProductById(id);

            return res.status(RESPONSE.SUCCESS.PRODUCT_FETCHED.status).json({
                message: RESPONSE.SUCCESS.PRODUCT_FETCHED.message,
                data,
            });
        } catch (err: any) {
            return res.status(RESPONSE.ERROR.INTERNAL_SERVER_ERROR.status).json({
                message: err.message || RESPONSE.ERROR.INTERNAL_SERVER_ERROR.message,
            });
        }
    }

    static async updateProduct(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const data = await ProductService.updateProduct(id, req.body);

            return res.status(RESPONSE.SUCCESS.PRODUCT_UPDATED.status).json({
                message: RESPONSE.SUCCESS.PRODUCT_UPDATED.message,
                data,
            });
        } catch (err: any) {
            return res.status(RESPONSE.ERROR.INTERNAL_SERVER_ERROR.status).json({
                message: err.message || RESPONSE.ERROR.INTERNAL_SERVER_ERROR.message,
            });
        }
    }

    static async deleteProduct(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const data = await ProductService.deleteProduct(id);

            return res.status(RESPONSE.SUCCESS.PRODUCT_DELETED.status).json({
                message: RESPONSE.SUCCESS.PRODUCT_DELETED.message,
                data,
            });
        } catch (err: any) {
            return res.status(RESPONSE.ERROR.INTERNAL_SERVER_ERROR.status).json({
                message: err.message || RESPONSE.ERROR.INTERNAL_SERVER_ERROR.message,
            });
        }
    }
}
