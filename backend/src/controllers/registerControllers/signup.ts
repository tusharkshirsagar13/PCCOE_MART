import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../../models/userModel";
import { otpStore } from "./sendOtp";
import { z } from "zod";

const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),

  email: z
    .string()
    .email("Invalid email format")
    .endsWith("@pccoepune.org", "Only PCCOE college email IDs are allowed"),

  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),

  password: z.string().min(6, "Password must be at least 6 characters"),

  otp: z.string().length(6, "OTP must be 6 digits"),
});

export const signup = async (req: Request, res: Response) => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ msg: parsed.error.issues[0].message });
  }

  const { name, email, phone, password, otp } = parsed.data;

  const storedOtpData = otpStore.get(email);
  if (!storedOtpData) {
    return res.status(400).json({ msg: "Invalid OTP, Try Again" });
  }

  if (Date.now() > storedOtpData.expiresAt) {
    otpStore.delete(email);
    return res.status(400).json({ msg: "OTP has expired." });
  }

  if (storedOtpData.otp !== otp) {
    return res.status(400).json({ msg: "Invalid OTP." });
  }

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ msg: "User already exists with this email." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new UserModel({
    name,
    email,
    phone,
    password: hashedPassword,
  });

  await user.save();
  otpStore.delete(email);

  return res.status(200).json({ msg: "Signup successful." });
};
