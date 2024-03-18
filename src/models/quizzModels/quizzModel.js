import { DataTypes } from 'sequelize'

export default (sequelize, models) => {
  const Quizz = sequelize.define(
    'Quizz',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: { type: DataTypes.STRING, allowNull: false },
      ownerId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'User', key: 'id' },
      },
      questionsAmount: { type: DataTypes.INTEGER, allowNull: false },
      levelId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'Level', key: 'id' },
      },
      specializationAreaId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'SpecializationArea', key: 'id' },
      },
      languages: { type: DataTypes.ARRAY(DataTypes.STRING) },
      frameworks: { type: DataTypes.ARRAY(DataTypes.STRING) },
      libsAndTools: { type: DataTypes.ARRAY(DataTypes.STRING) },
    },
    {
      timestamps: true,
    }
  )

  Quizz.belongsTo(models.User, { as: 'owner', foreignKey: 'ownerId' })
  Quizz.belongsTo(models.Level, { as: 'level', foreignKey: 'levelId' })
  Quizz.belongsTo(models.SpecializationArea, {
    as: 'specializationArea',
    foreignKey: 'specializationAreaId',
  })
  Quizz.belongsToMany(models.Question, {
    through: 'QuizzQuestions',
    foreignKey: 'quizzId',
    otherKey: 'questionId',
  })
  Quizz.belongsToMany(models.Language, {
    through: QuizzLanguage,
    foreignKey: 'quizzId',
    otherKey: 'languageId',
  })
  Quizz.belongsToMany(models.Framework, {
    through: QuizzFramework,
    foreignKey: 'quizzId',
    otherKey: 'frameworkId',
  })
  Quizz.belongsToMany(models.LibraryTool, {
    through: QuizzLibraryTool,
    foreignKey: 'quizzId',
    otherKey: 'libraryToolId',
  })
  Quizz.belongsToMany(models.Theme, {
    through: models.QuizzTheme,
    foreignKey: 'quizzId',
    otherKey: 'themeId',
  })
  Quizz.belongsToMany(models.Topic, {
    through: models.QuizzTopic,
    foreignKey: 'themeId',
    otherKey: 'topicId',
  })

  return Quizz
}
