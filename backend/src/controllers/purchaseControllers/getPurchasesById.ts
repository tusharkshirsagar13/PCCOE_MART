import { Request, Response } from "express";
import { PurchaseModel } from "../../models/purchaseModel";

export const getPurchasesByUserId = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "invalid token please login again",
            });
        }

        const purchases = await PurchaseModel.find({ seller: userId });

        res.status(200).json({
            success: true,
            data: purchases,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch purchases for user",
            error: error.message,
        });
    }
};
