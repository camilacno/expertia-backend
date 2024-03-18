import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const QuizzTheme = sequelize.define(
    'QuizzTheme',
    {
      quizzId: {
        type: DataTypes.UUID,
        references: { model: 'Quizz', key: 'id' },
      },
      themeId: {
        type: DataTypes.UUID,
        references: { model: 'Theme', key: 'id' },
      },
    },
    {
      timestamps: true,
    }
  )

  return QuizzTheme
}
