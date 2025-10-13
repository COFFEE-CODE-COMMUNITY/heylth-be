import { nanoid } from "nanoid";
import { findAllEatTracker, findEatTracker, newEatTracker } from "../repositories/eatTrackerRepository.js";

export const allEatTracker = async userId => {
    const result = await findAllEatTracker(userId);
    return result;
};

export const eatTrackerById = async (userId, eatId) => {
    const resultTemp = await findEatTracker(userId, eatId);
    console.log(resultTemp);
    if(!resultTemp) throw new Error(`Eat with id ${eatId} not found!`);
    const result = {...resultTemp, date: resultTemp.createdAt.toLocaleDateString()};
    return result;
}

export const addEatTracker = async (data, userId) => {
    const inputData = {id: nanoid(), userId, ...data};
    const resultTemp = await newEatTracker(inputData, userId);
    const result = {...resultTemp, date: resultTemp.createdAt.toLocaleDateString()};
    return result;
};