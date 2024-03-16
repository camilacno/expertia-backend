import pkg from 'joi'
const { object, string } = pkg

const feedbackValidationSchema = object({
  title: string().required(),
  text: string().required(),
})

export default feedbackValidationSchema
