import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const QuizzTopic = sequelize.define(
    'QuizzTopic',
    {
      themeId: {
        type: DataTypes.UUID,
        references: { model: 'Theme', key: 'id' },
      },
      topicId: {
        type: DataTypes.UUID,
        references: { model: 'Topic', key: 'id' },
      },
    },
    {
      timestamps: true,
    }
  )

  return QuizzTopic
}
