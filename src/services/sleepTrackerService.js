import { nanoid } from "nanoid";
import { findAllSleepTracker, findSleepTrackerById, newSleepTracker, updateSleepTracker } from "../repositories/sleepTrackerRepository.js";

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
    let sleepDuration;
    if( (data.sleep_start - data.sleep_end) < 0 ) sleepDuration = data.sleep_end - data.sleep_start;
    else sleepDuration = 24 - (data.sleep_start - data.sleep_end);
    const inputData = {id: nanoid(), sleepDuration, ...data};
    const result = await newSleepTracker(inputData, userId);
    return result;
};

export const updateSleepTrackerById = async (data, sleepId, userId) => {
    const isExist = await findSleepTrackerById(sleepId, userId);
    if(!isExist) throw new Error(`Sleep with id ${sleepId} at user id ${userId} not found!`);
    const updateData = {};

    
    if(data.sleep_start && ( (data.sleep_start - isExist.sleepEnd) < 0) ) {
        updateData.sleepStart = data.sleep_start;
        updateData.duration = isExist.sleepEnd - data.sleep_start;
        console.log(updateData);
    } else {
        updateData.sleepStart = data.sleep_start;
        updateData.duration = data.sleep_start - isExist.sleepEnd ;
        console.log(updateData);
    }
    
    if(data.sleep_end && ( ( data.sleep_start - isExist.sleepEnd) > 0) ) {
        updateData.sleepEnd = data.sleep_end;
        updateData.duration = 24 - (data.sleep_end - isExist.sleepStart);
        console.log(updateData);
    } else {
        updateData.sleepEnd = data.sleep_end;
        updateData.duration = data.sleep_end - isExist.sleepStart ;
        console.log(updateData);
    }

    const result = await updateSleepTracker(updateData, sleepId, userId);
    return result;
}