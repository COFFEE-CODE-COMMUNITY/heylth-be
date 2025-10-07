import { nanoid } from "nanoid";
import { findAllSleepTracker, newSleepTracker } from "../repositories/sleepTrackerRepository.js";

export const getAllSleepTracker = async userId => {
    const sleepTracker = await findAllSleepTracker(userId);
    return sleepTracker;
};  

export const addSleepTracker = async (data, userId) => {
    const inputData = {id: nanoid(), ...data, userId}
    const result = await newSleepTracker(inputData);
    return result;
};