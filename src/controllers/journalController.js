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
        data: result.map(j => ({
            id: j.id,
            mood: j.mood,
            title: j.title,
            description: j.description,
            dayNumber: j.createdAt.getDate(),
            dayText: Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(j.createdAt),
            month: Intl.DateTimeFormat('en-US', {month: 'long'}).format(j.createdAt),
            year: j.createdAt.getFullYear(),
            createdAt: j.createdAt,
            updatedAt: j.updateAt,

        })),
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