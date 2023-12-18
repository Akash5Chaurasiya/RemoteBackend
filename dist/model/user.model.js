"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phoneNumber: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    skills: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Skill',
        }],
    professionalExperience: [{
            companyName: {
                type: String,
                required: true,
            },
            techStack: String,
            skillsUsed: [{
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Skill',
                }],
            timePeriod: String,
        }],
    educationalExperience: [{
            degreeName: {
                type: String,
                required: true,
            },
            schoolName: {
                type: String,
                required: true,
            },
            timePeriod: String,
        }],
    password: {
        type: String,
        required: true,
    },
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
