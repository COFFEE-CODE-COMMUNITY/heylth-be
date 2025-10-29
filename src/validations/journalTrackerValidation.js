import Joi from "joi";

export const addJournalSchema = Joi.object({
    mood: Joi.string().min(1).max(20).trim().required(),
    title: Joi.string().min(1).max(50).trim().required(),
    description: Joi.string().min(1).max(250).trim().required(),
});