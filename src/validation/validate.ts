import Joi from "joi";
import { ResponseError } from "../error/response-error";

const validate = <T>(schema: Joi.ObjectSchema<T>, request: unknown): T => {
  const result = schema.validate(request, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (result.error) {
    throw new ResponseError(400, result.error.message);
  } else {
    return result.value;
  }
};

export { validate };
