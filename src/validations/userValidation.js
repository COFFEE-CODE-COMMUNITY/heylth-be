import Joi from 'joi';

export const registerSchema = Joi.object({
    name: Joi.string().trim().min(1).max(64).required(),
    username: Joi.string().trim().min(1).max(64).required(),
    age: Joi.number().required(),
    sex: Joi.string().trim().min(1).max(1).required()
});