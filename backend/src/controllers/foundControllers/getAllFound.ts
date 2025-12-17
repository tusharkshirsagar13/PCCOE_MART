import { Request, Response } from "express";
import { foundModel } from "../../models/foundModel";
export const getAllFound = async (req: Request, res: Response) => {

  try {
    const items = await foundModel
      .find()
      .populate("finder", "name email"); // only return name & email from user

      console.log(items);
    res.status(200).json({
      success: true,
      data: items,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching found items",
      error: error.message,
    });
  }
};
