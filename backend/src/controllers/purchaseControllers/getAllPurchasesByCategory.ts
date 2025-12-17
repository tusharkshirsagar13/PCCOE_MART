import { Request, Response } from "express";
import { PurchaseModel } from "../../models/purchaseModel";

export const getPurchasesByCategory = async (req: Request, res: Response) => {
    try {
        const { category } = req.body;

        if (!category) {
            return res.status(400).json({
                success: false,
                message: "category is required in request body",
            });
        }

        const purchases = await PurchaseModel.find({ category });

        res.status(200).json({
            success: true,
            data: purchases,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch purchases for category",
            error: error.message,
        });
    }
};
