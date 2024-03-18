import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const QuizzLibraryTool = sequelize.define(
    'QuizzLibraryTool',
    {
      quizzId: {
        type: DataTypes.UUID,
        references: { model: 'Quizz', key: 'id' },
      },
      libraryToolId: {
        type: DataTypes.UUID,
        references: { model: 'LibraryTool', key: 'id' },
      },
    },
    {
      timestamps: true,
    }
  )

  return QuizzLibraryTool
}
