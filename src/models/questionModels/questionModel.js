import { DataTypes, Sequelize } from 'sequelize'

export default (sequelize, models) => {
  const Question = sequelize.define(
    'Question',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      type: { type: DataTypes.STRING, allowNull: false },
      timeEstimation: { type: DataTypes.INTEGER, allowNull: false },
      codeSnippet: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      timestamps: true,
    }
  )

  Question.hasMany(models.Option, { as: 'options', foreignKey: 'questionId' })
  Question.hasOne(models.Feedback, { as: 'feedback', foreignKey: 'questionId' })
  Question.hasMany(models.Link, {
    as: 'recommendedLinks',
    foreignKey: 'questionId',
  })
  Question.belongsToMany(models.Tag, {
    through: models.QuestionTag,
    foreignKey: 'questionId',
    otherKey: 'tagId',
  })

  return Question
}
