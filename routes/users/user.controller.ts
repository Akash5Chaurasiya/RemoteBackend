import catchErrorAsync from "../../utils/catchErrorAsync";
import { NextFunction, Request, Response, RequestHandler } from "express";
import { Secret } from "jsonwebtoken";
import { sendAdminCookie } from "../../utils/sendCookies";
import User from "../../model/user.model";

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

export const signUpDeveloper = catchErrorAsync(async (req: Request, resp: Response, next: NextFunction) => {
    const { firstName, lastName, phoneNumber, email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return next(new Error(`User Already Exists`));
        }
        const hashedPass = await bcrypt.hash(password, 10);
        console.log(hashedPass)
        const newUser = new User({
            firstName,
            lastName,
            phoneNumber,
            email,
            password: hashedPass
        });
        await newUser.save();
        resp.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during sign-up:', error);
        resp.status(500).json({ error: 'Internal server error' });
    }
})


export const getAllDeveloper = catchErrorAsync(async (req: Request, resp: Response, next: NextFunction) => {
    const { token } = req.cookies;
    console.log("hii",token);
    let user = await User.find({});
    resp.status(201).json({
        success: true,
        message: "Getting All Developers successfully.",
        user,
    });
})

export const loginDeveloper = catchErrorAsync(async (req: Request, resp: Response, next: NextFunction) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const jwtKey = process.env.secret as Secret;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return resp.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        sendAdminCookie(resp, user, `Welcome Back,${user.firstName}`, jwtKey.toString(), 200);
    } catch (error: any) {
        return resp.status(500).json({ success: false, message: error.message });
    }
});


export const onBoardDeveloper = catchErrorAsync(async (req: Request, resp: Response, next: NextFunction) => {
    const { email, skills, professionalExperience, educationalExperience, password } = req.body;
    try {
        const jwtKey = process.env.secret as Secret;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return resp.status(401).json({ error: 'Invalid credentials' });
        }
        sendAdminCookie(resp, user, `Welcome Back,${user.firstName}`, jwtKey.toString(), 200);
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
    } catch (error: any) {
        console.error('Error during onboarding:', error);
        resp.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
});