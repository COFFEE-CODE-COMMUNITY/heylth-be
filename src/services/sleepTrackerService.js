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
    if (!isExist) throw new Error(`Sleep with id ${sleepId} at user id ${userId} not found!`);
  
    // Ambil nilai terbaru kalau diupdate, kalau ga ya pakai nilai lama
    const start = data.sleep_start ?? isExist.sleepStart;
    const end = data.sleep_end ?? isExist.sleepEnd;
  
    // Validasi range jam
    if (start < 0 || start >= 24 || end < 0 || end >= 24) {
      throw new Error("sleep_start and sleep_end must be between 0 and 23");
    }
  
    // Hitung durasi (handle kasus tidur lewat tengah malam)
    let duration = end - start;
    if (duration < 0) duration += 24;
    if (duration === 24) duration = 0; 
  
    const updateData = {
      sleepStart: start,
      sleepEnd: end,
      duration,
    };
  
    const result = await updateSleepTracker(updateData, sleepId, userId);
    return result;
  };