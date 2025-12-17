import { Request, Response } from "express";
import { transporter } from "../../utils/mailer";

export const otpStore = new Map<string, { otp: string; expiresAt: number }>();

export const sendOtp = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ msg: "Email is required." });
  }

  if (!email.endsWith("@pccoepune.org")) {
    return res
      .status(400)
      .json({ msg: "Only PCCOE college emails are allowed." });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

  otpStore.set(email, { otp, expiresAt });

  try {
    await transporter.sendMail({
      from: "PCCOE Mart <your_email@gmail.com>",
      to: email,
      subject: "Your OTP for PCCOE Mart Signup",
      text: `Your OTP is ${otp}. It expires in 5 minutes.`,
    });

    return res.status(200).json({ msg: "OTP sent to your PCCOE email." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Failed to send OTP email." });
  }
};
