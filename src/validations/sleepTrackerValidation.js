import Joi from 'joi';

export const addSleepTracker = Joi.object({
    sleep_start: Joi.number().required(),
    sleep_end: Joi.number().required()
});
