"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const skills_route_1 = __importDefault(require("./routes/skills/skills.route"));
const user_routes_1 = __importDefault(require("./routes/users/user.routes"));
const cookieParser = require('cookie-parser');
const cors = require('cors');
const allowedOrigins = ['http://localhost:3000', 'https://bejewelled-khapse-aea2f6.netlify.app'];
const express = require('express');
const app = express();
app.use(express.json());
app.use(cors({ origin: '*', credentials: true }));
app.options('*', cors({ origin: '*', credentials: true }));
require('dotenv').config();
app.use(cookieParser());
app.use('/users', user_routes_1.default);
app.use(`/skills`, skills_route_1.default);
app.listen(process.env.PORT, async () => {
    try {
        await db_1.connection;
        console.log("listening to port", process.env.PORT);
    }
    catch (error) {
        console.log(error);
    }
});
