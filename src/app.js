import cookieParser from 'cookie-parser';
import express from 'express';
import authRoutes from "./modules/auth/auth.routes.js"

const app = express();


// setup middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// set up routes
app.use("/api/auth", authRoutes)

export default app;