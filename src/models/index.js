// TODO: update server to sync db
// Exemplo em um arquivo app.js ou database.js
import { sequelize } from './models'

sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!')
})

// TODO: finish index.js file with all the models and associations
// database designer
import Sequelize from 'sequelize'
import questionModel from './questionModels/questionModel'
import tagModel from './questionModels/tagModel'
import questionTagModel from './questionModels/questionTagModel'
// Importe outros modelos aqui

const sequelize = new Sequelize('database', 'username', 'password', {
  // Configuração do banco de dados
})

const models = {
  Question: questionModel(sequelize, Sequelize),
  Tag: tagModel(sequelize, Sequelize),
  QuestionTag: questionTagModel(sequelize, Sequelize),
  // Inicialize outros modelos aqui
}

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models)
  }
})

export { sequelize }
export default models

// src/models/index.js
import Sequelize from 'sequelize'
import config from '../config/config' // Caminho hipotético para as configurações do seu banco de dados

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

// src/models/index.js
import Feedback from './questionModels/feedbackModel'
import Link from './questionModels/linkModel'
import Option from './questionModels/optionModel'
import QuestionTag from './questionModels/questionTagModel' // Certifique-se de que este é o modelo correto para a tabela de associação
import Question from './questionModels/questionModel'
import Quizz from './quizzModels/quizzModel'
// Importe outros modelos conforme necessário

// Defina as associações aqui
Question.hasMany(Option, { as: 'options' })
Question.hasOne(Feedback, { as: 'feedback' })
Question.hasMany(Link, { as: 'recommendedLinks' })
Question.belongsToMany(Tag, { through: QuestionTag })
Tag.belongsToMany(Question, { through: QuestionTag })
// Defina outras associações conforme necessário

// Exporte os modelos e associações
export { Feedback, Link, Option, QuestionTag, Question, Quizz }
