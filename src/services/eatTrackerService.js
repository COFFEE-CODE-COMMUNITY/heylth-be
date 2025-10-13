import { nanoid } from "nanoid";
import { findAllEatTracker, findEatTracker, newEatTracker, updateEatTracker } from "../repositories/eatTrackerRepository.js";

export const allEatTracker = async userId => {
    const result = await findAllEatTracker(userId);
    return result;
};

export const eatTrackerById = async (userId, eatId) => {
    const resultTemp = await findEatTracker(userId, eatId);
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

export const updateEatTrackerById = async (updateData, userId, eatId) => {
    const isExist = await findEatTracker(userId, eatId);
    if(!isExist) throw new Error(`Eat with id ${eatId} not found!`);
    const resultTemp = await updateEatTracker(updateData, userId, eatId);
    const result = {...resultTemp, date: resultTemp.createdAt.toLocaleDateString()};
    return result;
};