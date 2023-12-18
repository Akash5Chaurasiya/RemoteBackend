import { Schema, model, Document } from "mongoose";

interface ISkill extends Document {
    name: string;
}

const skillsSchema = new Schema<ISkill>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
});

const Skill = model<ISkill>('Skill', skillsSchema);

export default Skill;
