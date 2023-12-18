"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSkills = exports.deleteSkill = exports.addSkill = void 0;
const catchErrorAsync_1 = __importDefault(require("../../utils/catchErrorAsync"));
const skills_model_1 = __importDefault(require("../../model/skills.model"));
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.addSkill = (0, catchErrorAsync_1.default)(async (req, resp, next) => {
    try {
        const { name } = req.body;
        const newSkill = new skills_model_1.default({ name });
        await newSkill.save();
        resp.status(201).json({ message: 'Skill created successfully', skill: newSkill });
    }
    catch (error) {
        console.error(error);
        resp.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.deleteSkill = (0, catchErrorAsync_1.default)(async (req, res, next) => {
    try {
        const skillId = req.params.id;
        const skillToDelete = await skills_model_1.default.findById(skillId);
        if (!skillToDelete) {
            res.status(404).json({ message: 'Skill not found' });
            return;
        }
        await skills_model_1.default.deleteOne({ _id: skillToDelete._id });
        res.status(200).json({ message: 'Skill deleted successfully', skill: skillToDelete });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getAllSkills = (0, catchErrorAsync_1.default)(async (req, res, next) => {
    try {
        const skills = await skills_model_1.default.find({});
        res.status(200).json({ skills });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
