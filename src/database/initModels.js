import sequelize from './postgres.db.js'
import SpecializationArea from '../models/quizzModels/specializationAreamodels/specializationAreaModel.js'
import Theme from '../models/quizzModels/specializationAreamodels/themeModel.js'
import Topic from '../models/quizzModels/specializationAreamodels/topicModel'
import Level from '../models/quizzModels/levelModel.js'
import Quizz from '../models/quizzModels/quizzModel.js'
import User from '../models/userModels/userModel.js'

const models = {
  SpecializationArea: SpecializationArea(sequelize, models),
  Theme: Theme(sequelize, models),
  Topic: Topic(sequelize, models),
  Level: Level(sequelize, models),
  Quizz: Quizz(sequelize, models),
  User: User(sequelize, models),
}

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models)
  }
})

sequelize.sync()

export default models
