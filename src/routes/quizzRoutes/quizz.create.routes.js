import express from 'express'
import { celebrate, errors } from 'celebrate'
import quizzCreateController from '../../controllers/quizz.create.controller.js'

const quizzRouter = express.Router()

// Initialize a new quiz
quizzRouter.post(
  '/quizz/init',
  celebrate(/* validation schema */),
  quizzController.initQuizz
)

// Add libraries and tools to the quiz
quizzRouter.post(
  '/quizz/libs-tools',
  celebrate(/* validation schema */),
  quizzController.createQuizz
)

// Define themes and topics for the quiz
quizzRouter.post(
  '/quizz/:quizzId/themes-topics',
  celebrate(/* validation schema */),
  quizzController.themesQuizz
)

// Generate questions for the quiz
quizzRouter.post(
  '/quizz/:quizzId/generate-questions',
  celebrate(/* validation schema */),
  quizzController.generateQuestions
)

// Finalize the quiz
quizzRouter.post(
  '/quizz/:quizzId/finish-quizz',
  celebrate(/* validation schema */),
  quizzController.finishQuizz
)

// Retrieve a quiz by ID
quizzRouter.get('/quizz/:id', quizzController.getQuizzById)

// Get quizzes by user ID
quizzRouter.get('/quizz/user/:id', quizzController.getQuizzesByUser)

// Update a quiz
quizzRouter.put(
  '/quizz/:id',
  celebrate(/* validation schema */),
  quizzController.updateQuizz
)

// Delete a quiz
quizzRouter.delete('/quizz/:id', quizzController.deleteQuizz)

// Celebrate error handler
quizzRouter.use(errors())

// General error handler
quizzRouter.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send('Internal server error')
})

export default quizzRouter
