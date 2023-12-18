import { Schema, model, Document, Types } from "mongoose";
interface ISkill extends Document {
    name: string;
}

interface IProfessionalExperience extends Document {
    companyName: string;
    techStack?: string;
    skillsUsed: Types.ObjectId[] | ISkill[];
    timePeriod: string;
}

interface IEducationalExperience extends Document {
    degreeName: string;
    schoolName: string;
    timePeriod: string;
}

interface IUser extends Document {
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    email: string;
    skills: Types.ObjectId[] | ISkill[];
    professionalExperience: Types.ObjectId[] | IProfessionalExperience[];
    educationalExperience: Types.ObjectId[] | IEducationalExperience[];
    password: string;
}
const userSchema = new Schema<IUser>({
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
        type: Schema.Types.ObjectId,
        ref: 'Skill',
    }],
    professionalExperience: [{
        companyName: {
            type: String,
            required: true,
        },
        techStack: String,
        skillsUsed: [{
            type: Schema.Types.ObjectId,
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

const User = model<IUser>('User', userSchema);
export default User;
