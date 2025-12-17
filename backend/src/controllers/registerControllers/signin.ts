import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../../models/userModel";
import { z } from "zod";

const signinSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(1, "Password is required"),
});


export const signin = async (req: Request, res: Response) => {

    // console.log(req.body);

    const parsed = signinSchema.safeParse(req.body);

    console.log(parsed);

    // console.log(parsed);
    if (!parsed.success) {
        return res.status(400).json({ msg: parsed.error.issues[0].message });
    }

    const { email, password } = parsed.data;


    const user = await UserModel.findOne({ email });
    if (!user) {
        return res.status(400).json({ msg: "User not found. Please sign up." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ msg: "Invalid credentials." });
    }

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET as string
    );

    // console.log(token);

    return res.status(200).json({
        msg: "Signin successful",
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
        },
    });
};
