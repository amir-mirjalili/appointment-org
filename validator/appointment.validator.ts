import Joi from "joi";

export const AppointmentValidator = {
  create: Joi.object({
    id: Joi.string().allow("", null),
    start: Joi.date().required(),
    end: Joi.date().required(),
  }),
};
