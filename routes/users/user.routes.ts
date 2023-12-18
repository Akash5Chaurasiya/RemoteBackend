import { auth } from "../../middleware/auth.middleware";
import { getAllDeveloper, loginDeveloper, onBoardDeveloper, signUpDeveloper } from "./user.controller";

const express = require('express');
const userRouter = express.Router();

userRouter.route(`/dev`).get(auth,getAllDeveloper);
userRouter.post(`/dev/signup`, signUpDeveloper);
userRouter.route(`/dev/login`).post(loginDeveloper);
userRouter.post(`/dev/onBoard`, onBoardDeveloper);

export default userRouter;