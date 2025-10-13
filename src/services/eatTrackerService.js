import { nanoid } from "nanoid";
import { findAllEatTracker, newEatTracker } from "../repositories/eatTrackerRepository.js";

export const allEatTracker = async userId => {
    const result = await findAllEatTracker(userId);
    return result;
};

export const addEatTracker = async (data, userId) => {
    const inputData = {id: nanoid(), userId, ...data};
    const resultTemp = await newEatTracker(inputData, userId);
    const result = {...resultTemp, date: resultTemp.createdAt.toLocaleDateString()};
    return result;
};