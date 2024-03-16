import pkg from 'joi'

const { object, string, number, array } = pkg

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

export default questionValidationSchema
