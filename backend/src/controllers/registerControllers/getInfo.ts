import { Request, Response } from "express";
import { UserModel } from "../../models/userModel";

export const getInfo = async (req: Request & { userId?: string }, res: Response) => {
  try {
    
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is missing" });
    }

    const userData = await UserModel.findById(userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(userData);
  } catch (error) {
    console.error("Error in getInfo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
