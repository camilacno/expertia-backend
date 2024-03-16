import mongoose from 'mongoose'
import pkg from 'joi'
import { optionSchema } from './optionSchema'
import { linkSchema } from './linkSchema'
import { feedbackSchema } from './feedbackSchema'

const { Schema, model } = mongoose
const { object, string, number, array } = pkg

const baseQuestionSchema = new Schema(
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

const questionValidationSchema = object({
  title: string().required(),
  description: string().required(),
  type: string()
    .valid('no_code', 'code_in_description', 'code_in_options', 'match')
    .required(),
  tags: array().items(string()),
  timeEstimation: number().min(1).max(10).required(),
  feedback: object({
    title: string().required(),
    text: string().required(),
  }),
  recommendedLinks: array().items(
    object({
      title: string().required(),
      url: string().uri().required(),
    })
  ),
  options: array().items(
    object({
      text: string().required(),
      correct: boolean().required(),
    })
  ),
  details: object().unknown(true),
})

const Question = model('Question', baseQuestionSchema)

export { Question, questionValidationSchema }
