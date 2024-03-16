import pkg from 'joi'
const { object, string } = pkg

const linkValidationSchema = object({
  title: string().required(),
  url: string().uri().required(),
})

export default linkValidationSchema
