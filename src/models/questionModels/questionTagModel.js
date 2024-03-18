import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const QuestionTag = sequelize.define(
    'QuestionTag',
    {
      questionId: {
        type: DataTypes.UUID,
        references: {
          model: 'Question',
          key: 'id',
        },
      },
      tagId: {
        type: DataTypes.UUID,
        references: {
          model: 'Tag',
          key: 'id',
        },
      },
    },
    {
      timestamps: true,
    }
  )

  return QuestionTag
}
