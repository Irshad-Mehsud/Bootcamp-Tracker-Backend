import Joi from "joi";

// ================= CREATE USER =================

export const createUserSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .required(),

  email: Joi.string()
    .email()
    .lowercase()
    .required(),

  password: Joi.string()
    .min(6)
    .required(),

  role: Joi.string()
    .valid("admin", "teacher", "student")
    .default("student"),

  domain: Joi.string()
    .trim()
    .required(),

  bootcampId: Joi.string()
    .hex()
    .length(24)
    .optional(),
});