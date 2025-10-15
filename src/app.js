import express from "express";
import userRouter from './routes/userRoute.js';
import sleepTrackerRouter from './routes/sleepTrackerRoute.js';
import eatTrackerRouter from './routes/eatTrackerRoute.js';
import screenTimeRouter from './routes/screenTimeRoute.js'
import cors from 'cors';

const createApp = () => {
    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(express.urlencoded({ extended: false }));
    
    // Routes
    app.use('/api/auth', userRouter);
    app.use('/api/sleep', sleepTrackerRouter);
    app.use('/api/eat', eatTrackerRouter);
    app.use('/api/screenTime', screenTimeRouter);
    return app;
};

export default createApp;