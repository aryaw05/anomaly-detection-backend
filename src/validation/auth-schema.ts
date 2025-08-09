import Joi from "joi";

const registerUserValidation = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(6).max(255).required(),
  name: Joi.string().min(1).max(100).required(),
});

const loginUserValidation = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(6).max(255).required(),
});

export { registerUserValidation, loginUserValidation };
