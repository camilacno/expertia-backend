import { Schema } from 'mongoose'
import pkg from 'joi'
const { object, string, boolean } = pkg

const optionSchema = new Schema({
  text: { type: String, required: true },
  correct: { type: Boolean, required: true },
})

const optionValidationSchema = object({
  text: string().required(),
  correct: boolean().required(),
})

export { optionSchema, optionValidationSchema }
