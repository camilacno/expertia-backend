import { Schema } from 'mongoose'

const linkSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
})

export default linkSchema
