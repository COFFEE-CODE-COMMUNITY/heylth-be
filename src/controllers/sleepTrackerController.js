import { getAllSleepTracker } from "../services/sleepTrackerService.js";

export const getAllSleepTrackerController = async (req, res) => {
    const userSleepTracker = await getAllSleepTracker();
};