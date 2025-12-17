import express from "express";
import { sendOtp } from "../controllers/registerControllers/sendOtp";
import { signup } from "../controllers/registerControllers/signup";
import { signin } from "../controllers/registerControllers/signin";
import { getInfo } from "../controllers/registerControllers/getInfo";
import { authMiddleware } from "../middlewares/authMiddleware";
const registerRouter = express.Router();



registerRouter.post("/send-otp", sendOtp);
registerRouter.post("/signup", signup);
registerRouter.post("/signin", signin);
registerRouter.get("/info", authMiddleware, getInfo);


export default registerRouter;
