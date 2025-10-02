import Joi from 'joi';

export const registerSchema = Joi.object({
    email: Joi.string().trim().lowercase().email({ tlds: { allow: false }}).required(),
    username: Joi.string().trim().min(1).max(64).required(),
    password: Joi.string().trim().min(1).max(64).required(),
    age: Joi.number().required(),
    sex: Joi.string().trim().min(1).max(1).required()
});