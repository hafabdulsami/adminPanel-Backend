import { Request, Response } from "express";
import { DashboardService } from "../services/dashboardService";
import { RESPONSE } from "../utils/response";

export const getDashboardDataController = async (req: Request, res: Response) => {
    try {
        const data = await DashboardService.getDashboardData();
        return res.status(RESPONSE.SUCCESS.DASHBOARD_DATA.status).json({
            message: RESPONSE.SUCCESS.DASHBOARD_DATA.message,
            data,
        });
    } catch (error: any) {
        console.error(error);
        return res
            .status(RESPONSE.ERROR.INTERNAL_SERVER_ERROR.status)
            .json({ message: RESPONSE.ERROR.INTERNAL_SERVER_ERROR.message });
    }
};



