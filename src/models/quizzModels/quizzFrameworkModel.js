import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const QuizzFramework = sequelize.define(
    'QuizzFramework',
    {
      quizzId: {
        type: DataTypes.UUID,
        references: { model: 'Quizz', key: 'id' },
      },
      frameworkId: {
        type: DataTypes.UUID,
        references: { model: 'Framework', key: 'id' },
      },
    },
    {
      timestamps: true,
    }
  )

  return QuizzFramework
}
