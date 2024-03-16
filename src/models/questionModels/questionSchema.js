import mongoose from 'mongoose'
import { optionSchema } from './optionSchema'
import { linkSchema } from './linkSchema'
import { feedbackSchema } from './feedbackSchema'

const { Schema, model } = mongoose

const questionSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: {
      type: String,
      enum: ['noCode', 'codeInDescription', 'codeInOptions'],
      required: true,
    },
    tags: [{ type: String }],
    timeEstimation: { type: Number, required: true, min: 1, max: 10 },
    feedback: feedbackSchema,
    recommendedLinks: [linkSchema],
    options: [optionSchema],
    details: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
)

const Question = model('Question', questionSchema)

export default Question
