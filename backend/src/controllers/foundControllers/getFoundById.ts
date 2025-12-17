import { Request, Response } from "express";
import { foundModel } from "../../models/foundModel";

interface customRequest extends Request {
  userId?: string;
}

const getFoundById = async (req: customRequest, res: Response) => {
    
  const user = req.userId;

  try {
    const allFounds = await foundModel.find({
      finder: user,
    });

    res.status(200).json({
      data: allFounds,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching found items",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export default getFoundById;
