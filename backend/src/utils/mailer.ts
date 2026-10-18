import "dotenv/config";
import nodemailer from "nodemailer";
import { z } from "zod";

export const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 2525,
  secure: false,
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 20000,
  auth: {
    user: process.env.EMAIL_USER?.trim(),
    pass: process.env.EMAIL_PASS?.trim(),
  },
});

export function getOtpSender() {
  // Brevo's generated SMTP login is an authentication identity, not a sender.
  const sender = (process.env.EMAIL_FROM || process.env.EMAIL_USER || "").trim();
  if (!z.string().email().safeParse(sender).success || sender.endsWith("@smtp-brevo.com")) {
    throw new Error("Set EMAIL_FROM to a verified Brevo sender email address.");
  }
  return { name: "PCCOE Mart", address: sender };
}
