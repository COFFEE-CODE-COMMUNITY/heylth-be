import Joi from 'joi';

export const addScreenTimeSchema = Joi.object({
    duration_minutes: Joi.number().required(),
});
