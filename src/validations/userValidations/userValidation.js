import pkg from 'joi'

const { object } = pkg

export const userValidationSchema = object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  type: Joi.string().valid('client', 'guest').required(),
  userId: Joi.string().guid({ version: 'uuidv4' }),
})

export default userValidationSchema
