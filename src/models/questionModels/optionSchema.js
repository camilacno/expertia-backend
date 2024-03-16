import { Schema } from 'mongoose'

const optionSchema = new Schema({
  text: { type: String, required: true },
  correct: { type: Boolean, required: true },
})

export default optionSchema
