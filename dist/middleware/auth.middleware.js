"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const catchErrorAsync_1 = __importDefault(require("../utils/catchErrorAsync"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_model_1 = __importDefault(require("../model/user.model"));
dotenv_1.default.config();
exports.auth = (0, catchErrorAsync_1.default)(async (req, res, next) => {
    const { token } = req.cookies;
    console.log(token);
    const jwtSecret = process.env.secret;
    try {
        if (!jwtSecret) {
            throw new Error("JWT secret is not defined");
        }
        if (!token) {
            return res.status(401).json({ msg: "Unauthorized: Token missing" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        console.log(decoded);
        if (!decoded) {
            return res.status(401).json({ msg: "Unauthorized: Invalid token" });
        }
        const data = await user_model_1.default.findById(decoded.user);
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Employee not found in middleware.",
            });
        }
        console.log(data);
        if (data.firstName == 'Admin') {
            req.admin = data;
            return next();
        }
        else {
            return res.status(500).json({ msg: "Login with Admin" });
        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
