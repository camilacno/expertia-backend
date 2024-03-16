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
    { timestamps: true }
  )

  Quizz.associate = (models) => {
    Quizz.belongsTo(models.User, { as: 'owner', foreignKey: 'ownerId' })
    Quizz.belongsTo(models.Level, { as: 'level', foreignKey: 'levelId' })
    Quizz.belongsTo(models.SpecializationArea, {
      as: 'specializationArea',
      foreignKey: 'specializationAreaId',
    })
    Quizz.belongsToMany(models.Theme, {
      through: 'QuizzThemes',
      foreignKey: 'quizzId',
      otherKey: 'themeId',
    })
    Quizz.belongsToMany(models.Question, {
      through: 'QuizzQuestions',
      foreignKey: 'quizzId',
      otherKey: 'questionId',
    })
  }

  return Quizz
}
