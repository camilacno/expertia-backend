import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import winston from 'winston'

dotenv.config()
const app = express()

const corsOptions = {
  origin: (origin, callback) => {
    const whiteList = process.env.WHITE_LIST.split(',')

    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Origin not allowed by CORS'))
    }
  },
}

const { combine, timestamp, label, printf } = winston.format
const logsFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`
})

global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.File({
      filename: './logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({ filename: './logs/combined.log' }),
  ],
  format: combine(label({ label: 'expertia-api' }), timestamp(), logsFormat),
})

if (process.env.NODE_ENV !== 'production') {
  global.logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  )
}

app.use(express.json())
app.use(cors(corsOptions))
app.use((err, req, res, next) => {
  global.logger.error(`${req.method} ${req.baseUrl} - ${err.message}`)
  if (res && res.status) {
    res.status(400).send({ error: err.message })
  }
})

app.listen(process.env.PORT, () => {
  global.logger.info(`API Started on port ${process.env.PORT}`)
})
