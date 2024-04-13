import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
dotenv.config();

import userRoutes from './routes/userRoutes.js';
import { notFound,errorHandler } from "./middlewares/errorMiddleware.js";
import connectDB from "./config/db.js";

const app = express();
const port = process.env.PORT || 5000;
connectDB();

// Middleware to parse json data
app.use(express.json());
// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
// Middleware to parse cookie
app.use(cookieParser());

// Calling api routes
app.use("/api/users", userRoutes);

// Calling error handling middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started at ${port}`));