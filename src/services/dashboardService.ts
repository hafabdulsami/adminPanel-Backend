import { prisma } from "../config/prisma";

export class DashboardService {
    static async getDashboardData(): Promise<any> {
        const userCount = await prisma.user.count();
        const productCount = await prisma.product.count();
        return { userCount, productCount };
    }
}
