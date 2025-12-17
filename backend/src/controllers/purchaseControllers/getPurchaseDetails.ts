import { PurchaseModel } from "../../models/purchaseModel";
import { Request, Response } from "express";


export const getPurchaseDetails = async (req : Request, res : Response) => {
    console.log(req.body);

    try {
        const id = req.body.id;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "invalid token please login again",
            });
        }

        const purchase = await PurchaseModel.findById(id).populate("seller");

        res.status(200).json({
            success: true,
            data: purchase,
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch purchase details",
            error: error.message,
        });
    }
};