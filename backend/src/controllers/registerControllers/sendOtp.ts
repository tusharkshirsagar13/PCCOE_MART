import { Request, Response } from "express";
import { randomInt } from "node:crypto";
import { z } from "zod";
import { transporter, getOtpSender } from "../../utils/mailer";

export const otpStore = new Map<string, { otp: string; expiresAt: number }>();

export const sendOtp = async (req: Request, res: Response) => {
  const { email } = req.body || {};
  if (!email) {
    return res.status(400).json({ msg: "Email is required." });
  }
  if (!z.string().email().safeParse(email).success) {
    return res.status(400).json({ msg: "Invalid email format." });
  }
  if (!email.endsWith("@pccoepune.org")) {
    return res.status(400).json({ msg: "Only PCCOE college emails are allowed." });
  }

  const otp = randomInt(100000, 1000000).toString();
  try {
    await transporter.sendMail({
      from: getOtpSender(),
      to: email,
      subject: "Your OTP for PCCOE Mart Signup",
      text: `Your OTP is ${otp}. It expires in 5 minutes.`,
    });
    // An undelivered code must never become valid for signup.
    otpStore.set(email, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });
    return res.status(200).json({ msg: "OTP sent to your PCCOE email." });
  } catch (error) {
    const failure = error as { code?: string; responseCode?: number };
    console.error("OTP email delivery failed", {
      code: failure.code || "EMAIL_CONFIGURATION_ERROR",
      responseCode: failure.responseCode,
    });
    return res.status(500).json({ msg: "Failed to send OTP email." });
  }
};
