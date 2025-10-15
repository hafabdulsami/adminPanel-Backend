import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization || "";

    token = token.replace(/^Bearer\s*/i, "").trim();
    if (!token) return res.status(401).json({ error: "No token provided" });

    try {
        const decoded = verifyToken(token) as { id: number };
        (req as any).userId = decoded.id;
        next();
    } catch {
        res.status(401).json({ error: "Invalid token" });
    }
};
