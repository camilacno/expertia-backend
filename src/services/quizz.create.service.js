import quizzCreateRepository from '../services/quizz.create.repository.js'

async function initQuizz() {
  return await quizzCreateRepository.initQuizz()
}

async function createQuizz() {
  return await quizzCreateRepository.createQuizz()
}

async function themesQuizz() {
  return await quizzCreateRepository.themesQuizz()
}

async function generateQuestions() {
  return await quizzCreateRepository.generateQuestions()
}

async function finishQuizz() {
  return await quizzCreateRepository.finishQuizz()
}

async function getQuizzById() {
  return await quizzCreateRepository.getQuizzById()
}

async function getQuizzesByUser() {
  return await quizzCreateRepository.getQuizzesByUser()
}

async function updateQuizz() {
  return await quizzCreateRepository.updateQuizz()
}

async function deleteQuizz() {
  return await quizzCreateRepository.deleteQuizz()
}

export default {
  initQuizz,
  createQuizz,
  themesQuizz,
  generateQuestions,
  finishQuizz,
  getQuizzById,
  getQuizzesByUser,
  updateQuizz,
  deleteQuizz,
}
