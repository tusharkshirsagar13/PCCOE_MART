import { Request, Response } from "express";
import { foundModel } from "../../models/foundModel";

export const searchFound = async (req: Request, res: Response) => {
  try {
    const query  = req.body.query;
    console.log(query);

    if (!query || typeof query !== "string") {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const results = await foundModel.find({
      name: { $regex: query, $options: "i" }  // case-insensitive search
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
