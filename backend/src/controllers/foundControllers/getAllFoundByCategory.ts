import { Request, Response } from "express";
import { foundModel } from "../../models/foundModel";

export const getFoundItemsByCategory = async (req: Request, res: Response) => {

    try {
        const { category } = req.body;

        const items = await foundModel.find({ category }).populate("finder", "name email");
        res.status(200).json(items);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching by category", error });
    }
};
