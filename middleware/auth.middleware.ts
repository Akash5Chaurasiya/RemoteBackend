import jwt, { Secret } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import catchErrorAsync from "../utils/catchErrorAsync";
import dotenv from "dotenv";
import User from "../model/user.model";

dotenv.config();

export const auth = catchErrorAsync(async (req: any, res: Response, next: NextFunction) => {
    const { token } = req.cookies;
    console.log(token);
    const jwtSecret = process.env.secret as Secret | undefined;
    try {
        if (!jwtSecret) {
            throw new Error("JWT secret is not defined");
        }
        if (!token) {
            return res.status(401).json({ msg: "Unauthorized: Token missing" });
        }
        const decoded: any = jwt.verify(token, jwtSecret);
        console.log(decoded);
        if (!decoded) {
            return res.status(401).json({ msg: "Unauthorized: Invalid token" });
        }
        const data = await User.findById(decoded.user);
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Employee not found in middleware.",
            });
        }
        console.log(data);
        if (data.firstName == 'Admin') {
            req.admin = data;
            return next()
        } else {
            return res.status(500).json({ msg: "Login with Admin" });
        }
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
});
