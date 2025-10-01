import express from "express";
import userRouter from './routes/userRoute.js';

const createApp = () => {
    const app = express();

    app.use('/api', userRouter);

    return app;
};

export default createApp;