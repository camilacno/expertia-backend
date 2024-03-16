import pkg from 'joi'

const { object } = pkg

export const passwordValidationSchema = object({
  password: Joi.string()
    .min(8)
    .pattern(
      new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')
    )
    .required()
    .messages({
      'string.min': `"password" should have a minimum length of eight characters`,
      'string.pattern.base': `"password" should have at least one uppercase letter, one lowercase letter, one number, and one special character`,
    }),
})

export default passwordValidationSchema
