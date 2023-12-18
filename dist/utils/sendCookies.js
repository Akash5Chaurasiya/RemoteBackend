"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAdminCookie = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendAdminCookie = (resp, user, message, jwtKey, statusCode = 200) => {
    try {
        console.log(user);
        const token = jsonwebtoken_1.default.sign({ user: user._id }, jwtKey);
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
        });
    }
    catch (error) {
        return resp.status(500).json({
            success: false,
            error: error.message,
            message: "Error while creating and sending the cookie.",
        });
    }
};
exports.sendAdminCookie = sendAdminCookie;
