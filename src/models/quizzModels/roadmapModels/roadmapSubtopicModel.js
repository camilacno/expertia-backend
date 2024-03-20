import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const RoadmapSubtopic = sequelize.define(
    'RoadmapSubtopic',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      topicId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'RoadmapTopic', key: 'id' },
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

  RoadmapSubtopic.associate = () => {
    RoadmapSubtopic.belongsTo(models.RoadmapTopic, {
      foreignKey: 'topicId',
      as: 'topic',
    })
  }

  return RoadmapSubtopic
}
