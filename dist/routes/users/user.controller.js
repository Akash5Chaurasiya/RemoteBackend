"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onBoardDeveloper = exports.loginDeveloper = exports.getAllDeveloper = exports.signUpDeveloper = void 0;
const catchErrorAsync_1 = __importDefault(require("../../utils/catchErrorAsync"));
const sendCookies_1 = require("../../utils/sendCookies");
const user_model_1 = __importDefault(require("../../model/user.model"));
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.signUpDeveloper = (0, catchErrorAsync_1.default)(async (req, resp, next) => {
    const { firstName, lastName, phoneNumber, email, password } = req.body;
    try {
        const user = await user_model_1.default.findOne({ email });
        if (user) {
            return next(new Error(`User Already Exists`));
        }
        const hashedPass = await bcrypt.hash(password, 10);
        console.log(hashedPass);
        const newUser = new user_model_1.default({
            firstName,
            lastName,
            phoneNumber,
            email,
            password: hashedPass
        });
        await newUser.save();
        resp.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        console.error('Error during sign-up:', error);
        resp.status(500).json({ error: 'Internal server error' });
    }
});
exports.getAllDeveloper = (0, catchErrorAsync_1.default)(async (req, resp, next) => {
    const { token } = req.cookies;
    console.log("hii", token);
    let user = await user_model_1.default.find({});
    resp.status(201).json({
        success: true,
        message: "Getting All Developers successfully.",
        user,
    });
});
exports.loginDeveloper = (0, catchErrorAsync_1.default)(async (req, resp, next) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const jwtKey = process.env.secret;
        const user = await user_model_1.default.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return resp.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        (0, sendCookies_1.sendAdminCookie)(resp, user, `Welcome Back,${user.firstName}`, jwtKey.toString(), 200);
    }
    catch (error) {
        return resp.status(500).json({ success: false, message: error.message });
    }
});
exports.onBoardDeveloper = (0, catchErrorAsync_1.default)(async (req, resp, next) => {
    const { email, skills, professionalExperience, educationalExperience, password } = req.body;
    try {
        const jwtKey = process.env.secret;
        const user = await user_model_1.default.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return resp.status(401).json({ error: 'Invalid credentials' });
        }
        (0, sendCookies_1.sendAdminCookie)(resp, user, `Welcome Back,${user.firstName}`, jwtKey.toString(), 200);
        if (skills) {
            user.skills = skills;
        }
        if (professionalExperience) {
            user.professionalExperience = professionalExperience;
        }
        if (educationalExperience) {
            user.educationalExperience = educationalExperience;
        }
        await user.save();
        resp.status(200).json({ message: 'Developer onboarding details saved successfully' });
    }
    catch (error) {
        console.error('Error during onboarding:', error);
        resp.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
});
