import bcrypt from 'bcrypt'
import quizzCreateService from '../services/quizz.create.service.js'

async function initQuizz(req, res, next) {}

async function createQuizz(req, res, next) {}

async function themesQuizz(req, res, next) {}

async function generateQuestions(req, res, next) {}

async function finishQuizz(req, res, next) {}

async function getQuizzById(req, res, next) {}

async function getQuizzesByUser(req, res, next) {}

async function updateQuizz(req, res, next) {}

async function deleteQuizz(req, res, next) {}

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
