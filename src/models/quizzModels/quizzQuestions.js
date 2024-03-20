// quizzQuestionModel.js
import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const QuizzQuestion = sequelize.define(
    'QuizzQuestion',
    {
      quizzId: {
        type: DataTypes.UUID,
        references: {
          model: 'Quizz',
          key: 'id',
        },
        allowNull: false,
      },
      questionId: {
        type: DataTypes.UUID,
        references: {
          model: 'Question',
          key: 'id',
        },
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  )

  return QuizzQuestion
}
