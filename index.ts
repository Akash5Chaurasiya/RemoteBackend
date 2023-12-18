import { connection } from "./db";
import { auth } from "./middleware/auth.middleware";
import skill from "./routes/skills/skills.route";
import userRouter from "./routes/users/user.routes";
const cookieParser = require('cookie-parser');
const cors = require('cors');
const allowedOrigins = ['http://localhost:3000', 'https://bejewelled-khapse-aea2f6.netlify.app'];
const express = require('express');
const app = express();
app.use(express.json());
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.options('*', cors({ origin: allowedOrigins, credentials: true }));
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

