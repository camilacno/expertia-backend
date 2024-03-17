import Joi from 'joi'

const baseUserSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string()
    .min(8)
    .pattern(
      new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')
    )
    .messages({
      'string.min': `"password" should have a minimum length of 8 characters`,
      'string.pattern.base': `"password" should have at least one uppercase letter, one lowercase letter, one number, and one special character`,
    }),
  type: Joi.string().valid('client', 'guest'),
  userId: Joi.string().guid({ version: 'uuidv4' }).allow(null),
})

export const createUserSchema = baseUserSchema.fork(
  ['firstName', 'lastName', 'email', 'password', 'type'],
  (field) => field.required()
)

export const editUserSchema = baseUserSchema

export const changePasswordSchema = Joi.object({
  password: baseUserSchema.extract('password').required(),
})

export default {
  createUserSchema,
  editUserSchema,
  changePasswordSchema,
}
