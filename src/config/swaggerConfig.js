import swaggerJSDoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ExpertIA API',
      version: '1.0.0',
      description: 'ExpertIA API',
    },
    servers: [
      {
        url: 'http://localhost:8080',
      },
    ],
  },
  apis: ['./src/docs/*.yaml', './src/docs/schemas/*.yaml'],
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec
