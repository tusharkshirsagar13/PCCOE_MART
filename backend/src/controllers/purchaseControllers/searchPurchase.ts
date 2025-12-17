import { Request, Response } from "express";
import { PurchaseModel } from "../../models/purchaseModel";

export const searchPurchase = async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    console.log(query);

    if (!query || typeof query !== "string") {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const results = await PurchaseModel.find({
      name: { $regex: query, $options: "i" }, 
    });

    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Search failed",
      error: error.message,
    });
  }
};
