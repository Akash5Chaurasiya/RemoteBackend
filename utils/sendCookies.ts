import jwt, { Secret } from "jsonwebtoken";
import { Response } from 'express';

export const sendAdminCookie = (
    resp: Response,
    user: any,
    message: string,
    jwtKey: string,
    statusCode: number = 200
): Response => {
    try {
        console.log(user);
        const token = jwt.sign({ user: user._id }, jwtKey)
        console.log(token);
        return resp.status(statusCode).cookie("token", token, {
            maxAge: 5 * 60 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).json({
            success: true,
            message,
            user
        })
    } catch (error:any) {
        return resp.status(500).json({
            success: false,
            error: error.message,
            message: "Error while creating and sending the cookie.",
        });
    }
}
