import Joi from 'joi';

export const addSleepTrackerSchema = Joi.object({
    date: Joi.date().required(),
    sleep_start: Joi.number().required(),
    sleep_end: Joi.number().required(),
});

export const updateSleepTrackerSchema = Joi.object({
    sleep_start: Joi.number().optional(),
    sleep_end: Joi.number().optional(),
}).or('sleep_start', 'sleep_end');