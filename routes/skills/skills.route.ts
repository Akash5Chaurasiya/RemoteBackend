import { auth } from "../../middleware/auth.middleware";
import { addSkill, deleteSkill, getAllSkills } from "./skills.controller";

const express = require('express');
const skill = express.Router();

skill.route(`/createSkills`).post(auth,addSkill)
skill.route(`/skills/:id`).post(auth,deleteSkill)
skill.get(`/`, getAllSkills);

export default skill