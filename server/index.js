import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import AuthRoute from "./routes/AuthRoute.js";
import CategoryRoute from "./routes/CategoryRoute.js";
import BlogRoute from "./routes/BlogRoute.js";
import cors from "cors";

const app= express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.use('/api', AuthRoute);
app.use('/api', CategoryRoute);
app.use('/api', BlogRoute);

dotenv.config(); 
connectDB();

const port= process.env.port;
app.listen(port, () => {
    console.log(`App is listening at ${port}`);
})