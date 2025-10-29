import { nanoid } from "nanoid";
import { newJournal } from "../repositories/journalRepository.js";

export const addJournal = async (data, userId) => {
    const inputData = {id: nanoid(), ...data};
    const result = await newJournal(inputData, userId);
    return result;
};