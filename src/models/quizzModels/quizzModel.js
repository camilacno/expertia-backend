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
      roadmapId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'Roamap', key: 'id' },
      },
      libsAndTools: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
    },
    {
      timestamps: true,
    }
  )

  Quizz.belongsTo(models.User, { as: 'owner', foreignKey: 'ownerId' })
  Quizz.belongsTo(models.Level, { as: 'level', foreignKey: 'levelId' })
  Quizz.belongsTo(models.Roadmap, {
    as: 'roadmap',
    foreignKey: 'roadmapId',
  })
  Quizz.hasMany(models.AISuggestedTheme, {
    foreignKey: 'quizzId',
    as: 'aiSuggestedThemes',
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

  return Quizz
}
