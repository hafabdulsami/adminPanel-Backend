import { PrismaClient, Product } from "@prisma/client";
import {
    CreateProductRequestBody,
    UpdateProductRequestBody,
} from "../interfaces/product";

const prisma = new PrismaClient();

export class ProductService {
    // ✅ Create Product
    static async createProduct({
        name,
        price,
        category,
        userId,
    }: CreateProductRequestBody): Promise<Product> {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new Error("User not found");

        const product = await prisma.product.create({
            data: { name, price, category, userId },
        });

        return product;
    }

    // ✅ Get All Products (with creator info)
    static async getAllProducts(): Promise<(Product & { createdBy: any })[]> {
        const products = await prisma.product.findMany({
            include: { createdBy: true },
        });
        return products;
    }

    // ✅ Get Product by ID
    static async getProductById(id: number): Promise<Product & { createdBy: any }> {
        const product = await prisma.product.findUnique({
            where: { id },
            include: { createdBy: true },
        });

        if (!product) throw new Error("Product not found");

        return product;
    }

    // ✅ Update Product
    static async updateProduct(
        id: number,
        { name, price, category }: UpdateProductRequestBody
    ): Promise<Product> {
        const product = await prisma.product.findUnique({ where: { id } });
        if (!product) throw new Error("Product not found");

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                ...(name && { name }),
                ...(price && { price }),
                ...(category && { category }),
            },
        });

        return updatedProduct;
    }

    // ✅ Delete Product
    static async deleteProduct(id: number): Promise<{ message: string }> {
        const product = await prisma.product.findUnique({ where: { id } });
        if (!product) throw new Error("Product not found");

        await prisma.product.delete({ where: { id } });

        return { message: "Product deleted successfully" };
    }
}
