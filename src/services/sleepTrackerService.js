import { findAllSleepTracker } from "../repositories/sleepTrackerRepository.js";

export const getAllSleepTracker = async userId => {
    const sleepTracker = await findAllSleepTracker(userId);
    return sleepTracker;
};  