import { nanoid } from "nanoid";
import { findAllSleepTracker, findSleepTrackerById, newSleepTracker } from "../repositories/sleepTrackerRepository.js";

export const getAllSleepTracker = async userId => {
    const sleepTracker = await findAllSleepTracker(userId);
    return sleepTracker;
};  

export const getSleepTrackerById = async (sleepId, userId) => {
    const result = await findSleepTrackerById(sleepId, userId);
    if(!result) throw new Error(`Sleep id ${sleepId} not found!`);
    const date = result.createdAt.toLocaleDateString();
    return {...result, date};
}

export const addSleepTracker = async (data, userId) => {
    if((data.sleep_start - data.sleep_end) < 0 ) throw new Error('Invalid input of sleep_start or sleep_end!');
    const inputData = {id: nanoid(), ...data}
    const result = await newSleepTracker(inputData, userId);
    return result;
};