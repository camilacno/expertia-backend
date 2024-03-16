import { Schema } from 'mongoose'
import pkg from 'joi'
const { object, string } = pkg

const feedbackSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
})

export default feedbackSchema
