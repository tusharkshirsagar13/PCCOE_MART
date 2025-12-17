import { Request, Response } from "express";
import { foundModel } from "../../models/foundModel";

export const getFoundDetails = async (req : Request, res : Response) => {

    try {

        const id = req.body.id;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "invalid token please login again",
            });
        }

        const purchase = await foundModel.findById(id).populate("finder");

        res.status(200).json({
            success: true,
            data: purchase,
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch found details",
            error: error.message,
        });
    }
};