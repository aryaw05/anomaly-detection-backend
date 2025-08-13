import joi from "joi";
const addTaskValidatation = joi.object({
  tasks: joi.string().min(1).max(255).required(),
  status: joi.string().valid("OPEN", "ON_PROGRESS", "CLOSED").required(),
  id_infrastructure_detail: joi.number().integer().positive().required(),
  id_anomaly: joi.number().integer().positive().required(),
  id_user: joi.number().integer().positive().required(),
});

const removeTaskValidation = joi.object({
  id_user: joi.number().integer().positive().required(),
  id: joi.number().integer().positive().required(),
});

const getTaskValidation = joi.object({
  id_user: joi.number().integer().positive().required(),
  id: joi.number().integer().positive().required(),
});
export { addTaskValidatation, removeTaskValidation, getTaskValidation };
