import { Request, Response } from "express";
import { PurchaseModel } from "../../models/purchaseModel";

interface customRequest extends Request {
  userId?: string;
}

const getPurchaseById = async (req: customRequest, res: Response) => {
    
  const user = req.userId;

  try {
    const allPurchases = await PurchaseModel.find({
      seller: user,
    });

    res.status(200).json({
      data: allPurchases,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching Purchase items",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export default getPurchaseById;
