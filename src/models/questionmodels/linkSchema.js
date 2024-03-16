import { Schema } from 'mongoose'
import pkg from 'joi'
const { object, string } = pkg

const linkSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
})

const linkValidationSchema = object({
  title: string().required(),
  url: string().uri().required(),
})

export { linkSchema, linkValidationSchema }
