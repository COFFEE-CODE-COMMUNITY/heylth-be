import { allJournal, addJournal } from "../services/journalService.js";

export const getAllJournalController = async (req, res) => {
    const result = await allJournal(req.user.id);
    if(!result.length) return res.status(200).json({
        success: true,
        message: `You do not have any journal tracker!`,
    });
    return res.status(200).json({
        success: true,
        message: `Success to get user's all journal tracker!`,
        data: result,
    });
};


export const addJournalController = async (req, res) => {
    const result = await addJournal(req.body, req.user.id);
    return res.status(201).json({
        success: true,
        message: 'Success to create new journal!',
        data: result,
    });
};