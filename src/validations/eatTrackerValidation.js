import Joi from 'joi';

export const addEatTrackerSchema = Joi.object({
    date: Joi.date().required(),
    meal_type: Joi.string().trim().min(1).max(10).required(),
});

export const updateEatTrackerSchema = Joi.object({
    meal_type: Joi.string().trim().min(1).max(10).required(),
});