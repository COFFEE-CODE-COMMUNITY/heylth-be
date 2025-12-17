import express from "express";
import userRouter from './routes/userRoute.js';
import sleepTrackerRouter from './routes/sleepTrackerRoute.js';
import eatTrackerRouter from './routes/eatTrackerRoute.js';
import screenTimeRouter from './routes/screenTimeRoute.js';
import lifestyleRouter from './routes/lifestyleRoute.js';
import journalRouter from './routes/journalRoute.js';
import reminderRouter from './routes/reminderRoute.js';
import dashboardRouter from './routes/dashboardRoute.js';
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
    app.use('/api/lifestyle', lifestyleRouter);
    app.use('/api/journal', journalRouter);
    app.use('/api/reminder', reminderRouter);
    app.use('/api/dashboard', dashboardRouter);
    return app;
};

export default createApp;