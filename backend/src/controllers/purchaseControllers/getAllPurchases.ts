import { Request, Response } from "express";
import { PurchaseModel } from "../../models/purchaseModel";

export const getAllPurchases = async (req: Request, res: Response) => {

    
    try {
        const purchases = await PurchaseModel.find().populate("seller", "name email");
        res.status(200).json({
            success: true,
            data: purchases,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch purchase items",
            error: error.message,
        });
    }
};
