import { nanoid } from "nanoid";
import { findAllJournal, newJournal } from "../repositories/journalRepository.js";

export const allJournal = async userId => {
    const result = await findAllJournal(userId);
    return result;
};

export const addJournal = async (data, userId) => {
    const inputData = {id: nanoid(), ...data};
    const result = await newJournal(inputData, userId);
    return result;
};