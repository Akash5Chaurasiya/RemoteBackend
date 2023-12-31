"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = require("../../middleware/auth.middleware");
const user_controller_1 = require("./user.controller");
const express = require('express');
const userRouter = express.Router();
userRouter.route(`/dev`).get(auth_middleware_1.auth, user_controller_1.getAllDeveloper);
userRouter.post(`/dev/signup`, user_controller_1.signUpDeveloper);
userRouter.route(`/dev/login`).post(user_controller_1.loginDeveloper);
userRouter.post(`/dev/onBoard`, user_controller_1.onBoardDeveloper);
exports.default = userRouter;
