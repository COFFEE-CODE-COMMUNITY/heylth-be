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
    const dateNow = new Date().toLocaleDateString();

    const isExist = (await findAllEatTracker(userId)).filter(e => e.createdAt.toLocaleDateString() === dateNow && e.meal_type.toLowerCase() === data.meal_type.toLowerCase());
    if(isExist.length) throw new Error(`Eat tracker data with meal_type ${data.meal_type} and date ${dateNow} already exist!`);

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