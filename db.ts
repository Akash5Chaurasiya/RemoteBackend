import * as mongoose from 'mongoose';
require('dotenv').config();


const url = process.env.MONGO_URL;
if (!url) {
    throw new Error('MongoDB connection URL is not defined in the environment variables.');
}
export const connection = mongoose.connect(url).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log(error);
});

