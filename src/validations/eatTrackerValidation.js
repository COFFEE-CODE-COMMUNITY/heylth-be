import Joi from 'joi';

export const addEatTrackerSchema = Joi.object({
    meal_type: Joi.string().trim().min(1).max(10).required(),
});