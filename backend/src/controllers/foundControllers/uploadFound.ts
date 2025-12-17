import { Request, Response } from "express";
import { foundModel } from "../../models/foundModel";
import uploadimage from "../../utils/imageUploader";
import { UserModel } from "../../models/userModel";
import fs from "fs";

const getImageUrlFromKey = (key: string): string => {

  const bucket = process.env.S3_BUCKET_NAME!;
  const region = process.env.AWS_REGION!;

  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
};

const uploadFound = async (req: Request, res: Response) => {

  // @ts-ignore
  const id = req.userId;

  console.log(req.body);

  try {

    const { name, description, category} = req.body;
    console.log(name, description, category);

    if (!name || !description || !category ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }
    console.log("done");

    const files = req.files as Express.Multer.File[];
    const imageUrls: string[] = [];

    for (const file of files) {
      const filepath = file.path;
      const filename = file.originalname;

      const s3key = await uploadimage(filename, filepath);
      const s3Url = getImageUrlFromKey(s3key);
      imageUrls.push(s3Url);

      fs.unlinkSync(filepath);
    }

    console.log(imageUrls);
    
    const newFoundItem = new foundModel({
      name,
      description,
      category,
      imageUrls,
      finder : id,
    });

    const savedFoundItem = await newFoundItem.save();

    res.status(201).json({
      success: true,
      message: "Found item uploaded successfully",
      data: savedFoundItem,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to upload found item",
      error: error.message,
    });
  }
};

export default uploadFound;