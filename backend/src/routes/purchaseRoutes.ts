
import express from "express";
import { getAllPurchases } from "../controllers/purchaseControllers/getAllPurchases";
import { getPurchasesByUserId } from "../controllers/purchaseControllers/getPurchasesById";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getPurchasesByCategory } from "../controllers/purchaseControllers/getAllPurchasesByCategory";
import { multerMiddleware } from "../middlewares/multerMiddleware";
import { uploadPurchase } from "../controllers/purchaseControllers/uploadPurchase";
import { getPurchaseDetails } from "../controllers/purchaseControllers/getPurchaseDetails";
import { searchPurchase } from "../controllers/purchaseControllers/searchPurchase";
import { generatePurchaseDescription } from "../controllers/purchaseControllers/generatePurchaseDescription";
import deletePurchaseById from "../controllers/purchaseControllers/deletePurchaseById";
import getPurchaseById from "../controllers/purchaseControllers/getPurchaseById"; 

const purchaseRouter = express.Router();

purchaseRouter.get("/all", authMiddleware,getAllPurchases);
purchaseRouter.post("/category", authMiddleware, getPurchasesByCategory);
purchaseRouter.get("/user", authMiddleware, getPurchasesByUserId);
purchaseRouter.post("/upload", multerMiddleware, authMiddleware, uploadPurchase);
purchaseRouter.post("/search", authMiddleware, searchPurchase);
purchaseRouter.post('/detail', authMiddleware, getPurchaseDetails);
purchaseRouter.post('/delete', authMiddleware, deletePurchaseById);
purchaseRouter.post("/generate-description", generatePurchaseDescription);
purchaseRouter.get("/account", authMiddleware, getPurchaseById);


export default purchaseRouter;
