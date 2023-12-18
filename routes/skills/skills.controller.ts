import catchErrorAsync from "../../utils/catchErrorAsync";
import { NextFunction, Request, Response, RequestHandler } from "express";
import { Secret } from "jsonwebtoken";
import { sendAdminCookie } from "../../utils/sendCookies";
import Skill from "../../model/skills.model";

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


export const addSkill = catchErrorAsync(async (req: Request, resp: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        const newSkill = new Skill({ name });
        await newSkill.save();
        resp.status(201).json({ message: 'Skill created successfully', skill: newSkill });
    } catch (error) {
        console.error(error);
        resp.status(500).json({ message: 'Internal Server Error' });
    }
})

export const deleteSkill = catchErrorAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const skillId = req.params.id;
        const skillToDelete = await Skill.findById(skillId);
        if (!skillToDelete) {
            res.status(404).json({ message: 'Skill not found' });
            return;
        }
        await Skill.deleteOne({ _id: skillToDelete._id });
        res.status(200).json({ message: 'Skill deleted successfully', skill: skillToDelete });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export const getAllSkills = catchErrorAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const skills = await Skill.find({});
        res.status(200).json({ skills });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
