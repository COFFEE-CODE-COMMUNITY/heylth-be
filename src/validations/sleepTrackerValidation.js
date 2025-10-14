import Joi from 'joi';

export const addSleepTrackerSchema = Joi.object({
    sleep_start: Joi.number().required(),
    sleep_end: Joi.number().required(),
});
