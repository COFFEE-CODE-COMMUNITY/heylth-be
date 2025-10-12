import { findAllEatTracker } from "../repositories/eatTrackerRepository.js";

export const allEatTracker = async userId => {
    const result = await findAllEatTracker(userId);
    const date = result.map(r => r.createdAt);
    return {...result, date};
};