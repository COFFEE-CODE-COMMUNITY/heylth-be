import { findAllScreenTime } from "../repositories/screenTimeRepository.js";

export const allScreenTime = async userId => {
    const result = await findAllScreenTime(userId);
    return result;
};