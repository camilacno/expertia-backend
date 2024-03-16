import pkg from 'joi'
const { object, string, boolean } = pkg

const optionValidationSchema = object({
  text: string().required(),
  correct: boolean().required(),
})

export default optionValidationSchema
