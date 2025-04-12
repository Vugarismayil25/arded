import Joi from "joi"

export const registerValidation = Joi.object({
    role: Joi.string().valid("admin", "superadmin").required(),
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),

});
export const loginValidation = Joi.object({
    email: Joi.string().email().required(),

});