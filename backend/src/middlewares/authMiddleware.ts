import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
    userId?: string;
}

export const authMiddleware = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "Authorization token missing or invalid" });
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        if (typeof decoded === "object" && "userId" in decoded) {
            req.userId = decoded.userId;
            next();
        } else {
            return res.status(401).json({ msg: "Invalid token payload" });
        }
    } catch (err) {
        return res.status(401).json({ msg: "Invalid or expired token" });
    }
};
