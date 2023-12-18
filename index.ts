import { connection } from "./db";
import { auth } from "./middleware/auth.middleware";
import skill from "./routes/skills/skills.route";
import userRouter from "./routes/users/user.routes";
const cookieParser = require('cookie-parser');
const cors = require('cors');

const express = require('express');
const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
require('dotenv').config();
app.use(cookieParser());
app.use('/users', userRouter);
app.use(`/skills`, skill)
app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log("listening to port", process.env.PORT)
    } catch (error) {
        console.log(error);
    }
})