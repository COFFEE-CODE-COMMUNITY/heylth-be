import { nanoid } from "nanoid";
import { findAllScreenTime, newScreenTime} from "../repositories/screenTimeRepository.js";

export const allScreenTime = async userId => {
    const result = await findAllScreenTime(userId);
    return result;
};

export const addScreenTime = async (data, userId) => {
    const inputData = {id: nanoid(), userId, ...data}
    const result = await newScreenTime(inputData);
    return result;
};