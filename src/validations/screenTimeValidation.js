import Joi from 'joi';

export const addScreenTimeSchema = Joi.object({
    date: Joi.date().required(),
    duration: Joi.number().required(),
});

export const updateScreenTimeSchema = Joi.object({
    duration: Joi.number().required(),
});