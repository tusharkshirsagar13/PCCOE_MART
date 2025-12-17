import express from "express";
import { getAllFound } from "../controllers/foundControllers/getAllFound";
import { searchFound } from "../controllers/foundControllers/searchFound";
import { authMiddleware } from "../middlewares/authMiddleware";
import { multerMiddleware } from "../middlewares/multerMiddleware";
import { getFoundDetails } from "../controllers/foundControllers/getFoundDetails";
import uploadFound from "../controllers/foundControllers/uploadFound";
import { getFoundItemsByCategory } from "../controllers/foundControllers/getAllFoundByCategory";
import deleteFoundById from "../controllers/foundControllers/deleteFoundById";
import { generateFoundDescription } from "../controllers/foundControllers/generateFoundDescription";
import getFoundById from "../controllers/foundControllers/getFoundById";


const foundRouter = express.Router();


foundRouter.get("/all", authMiddleware, getAllFound);
foundRouter.post("/category", authMiddleware, getFoundItemsByCategory);
foundRouter.post("/upload", authMiddleware, multerMiddleware, uploadFound);
foundRouter.post("/search", authMiddleware, searchFound);
foundRouter.post('/detail', authMiddleware, getFoundDetails);
foundRouter.post("/delete", authMiddleware, deleteFoundById);
foundRouter.post("/generate-description", generateFoundDescription);
foundRouter.get("/account", authMiddleware, getFoundById);

export default foundRouter;
