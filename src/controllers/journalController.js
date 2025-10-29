import { addJournal } from "../services/journalService.js";

export const addJournalController = async (req, res) => {
    const result = await addJournal(req.body, req.user.id);
    return res.status(201).json({
        success: true,
        message: 'Success to create new journal!',
        data: result,
    });
};