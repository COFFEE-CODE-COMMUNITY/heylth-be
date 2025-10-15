import { nanoid } from "nanoid";
import { findAllScreenTime, findScreenTimeById, newScreenTime} from "../repositories/screenTimeRepository.js";

export const allScreenTime = async userId => {
    const result = await findAllScreenTime(userId);
    return result;
};

export const addScreenTime = async (data, userId) => {
    const inputData = {id: nanoid(), userId, ...data}
    const result = await newScreenTime(inputData);
    return result;
};

export const screenTimeById = async (screenTimeId, userId) => {
    const resultTemp = await findScreenTimeById(screenTimeId, userId);
    if(!resultTemp) throw new Error(`Screen time with id ${screenTimeId} in user id ${userId} not found!`);
    const result = {date: resultTemp.createdAt.toLocaleDateString(), ...resultTemp};
    return result;
}