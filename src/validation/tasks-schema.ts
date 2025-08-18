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

const getTaskValidationWithFilter = joi.object({
  page: joi.number().min(1).positive().default(1),
  size: joi.number().min(1).positive().max(100).default(10),
  task_name: joi.string().max(255).optional(),
});

const updateTaskValidation = joi.object({
  id: joi.number().integer().positive().required(),
  status: joi.string().valid("OPEN", "ON_PROGRESS", "CLOSED").optional(),
  tasks: joi.string().min(1).max(255).optional(),
  id_anomaly: joi.number().integer().positive().optional(),
  id_infrastructure_detail: joi.number().integer().positive().optional(),
});

const updateStatusTaskValidation = joi.object({
  id: joi.number().integer().positive().required(),
  status: joi.string().valid("OPEN", "ON_PROGRESS", "CLOSED").required(),
  note: joi.string().min(1).max(255).optional(),
});

export {
  addTaskValidatation,
  removeTaskValidation,
  getTaskValidation,
  getTaskValidationWithFilter,
  updateTaskValidation,
  updateStatusTaskValidation,
};
