import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const QuizzLanguage = sequelize.define(
    'QuizzLanguage',
    {
      quizzId: {
        type: DataTypes.UUID,
        references: { model: 'Quizz', key: 'id' },
      },
      languageId: {
        type: DataTypes.UUID,
        references: { model: 'Language', key: 'id' },
      },
    },
    {
      timestamps: true,
    }
  )

  return QuizzLanguage
}
