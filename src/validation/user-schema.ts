import Joi from "joi";

const updateUserProfileValidation = Joi.object({
  username: Joi.string().min(3).max(50).optional(),
  email: Joi.string().email().max(100).optional(),
  name: Joi.string().min(1).max(100).optional(),
}).min(1); // min 1 field diisi

const getUserIdValidation = Joi.object({
  id: Joi.number().integer().positive().required(),
});

export { updateUserProfileValidation, getUserIdValidation };
