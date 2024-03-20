import { DataTypes } from 'sequelize'

export default (sequelize, models) => {
  const RoadmapTopic = sequelize.define(
    'RoadmapTopic',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      themeId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'RoadmapTheme', key: 'id' },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tooltip: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
    }
  )

  RoadmapTopic.associate = () => {
    RoadmapTopic.belongsTo(models.RoadmapTheme, {
      foreignKey: 'themeId',
      as: 'theme',
    })
    RoadmapTopic.hasMany(models.RoadmapSubtopic, {
      foreignKey: 'topicId',
      as: 'subtopics',
    })
  }

  return RoadmapTopic
}
