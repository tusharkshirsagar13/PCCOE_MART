import { Request, Response } from "express";
import { PurchaseModel } from "../../models/purchaseModel";
import uploadimage from "../../utils/imageUploader";
import fs from "fs";
import path from "path";
import ca from "zod/v4/locales/ca.cjs";

const getImageUrlFromKey = (key: string): string => {
  const bucket = process.env.S3_BUCKET_NAME!;
  const region = process.env.AWS_REGION!;

  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
};

export const uploadPurchase = async (req: Request, res: Response) => {
  try {
    const { name, description, oldPrice, currentPrice, category } = req.body;

    //@ts-ignore
    const seller = req.userId;

    if (
      !name ||
      !description ||
      !oldPrice ||
      !currentPrice ||
      !category ||
      !seller
    ) {
      console.log(name, description, oldPrice, currentPrice, category, seller);
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const files = req.files as Express.Multer.File[];

    // 🔁 Upload images to S3 and collect keys (or URLs)
    const imageUrls: string[] = [];

    for (const file of files) {
      const filepath = file.path;
      const filename = file.originalname;

      const s3key = await uploadimage(filename, filepath);
      const s3Url = getImageUrlFromKey(s3key);
      imageUrls.push(s3Url);

      // Optional: remove local file after upload
      fs.unlinkSync(filepath);
    }

    // for (const file of files) {
    //   // Construct a URL pointing to your local server
    //   // Multer has already saved the file to 'backend/uploads'
    //   const localUrl = `http://localhost:3000/uploads/${file.filename}`;

    //   imageUrls.push(localUrl);

    //   // IMPORTANT: Do NOT delete the file (fs.unlinkSync) because we need it locally!
    // }
    // // console.log(imageUrls);

    const newPurchase = new PurchaseModel({
      name,
      description,
      oldPrice,
      currentPrice,
      category,
      imageUrls,
      seller,
    });

    const savedPurchase = await newPurchase.save();

    res.status(201).json({
      success: true,
      message: "Product uploaded successfully",
      data: savedPurchase,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to upload product",
      error: error.message,
    });
  }
};
