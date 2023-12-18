import { connection } from "./db";
import { auth } from "./middleware/auth.middleware";
import skill from "./routes/skills/skills.route";
import userRouter from "./routes/users/user.routes";
const cookieParser = require('cookie-parser');
const cors = require('cors');

const express = require('express');
const app = express();

app.use(express.json());
app.use(cors({ origin: '*', credentials: true }));
app.options('*', cors({ origin: '*', credentials: true }));
app.use(cookieParser());
app.use('/users', userRouter);
app.use('/skills', skill);

require('dotenv').config();

app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log("Server listening on port", process.env.PORT);
    } catch (error) {
        console.error("Error starting the server:", error);
    }
});
