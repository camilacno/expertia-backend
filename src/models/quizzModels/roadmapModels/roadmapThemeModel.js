import { DataTypes } from 'sequelize'

export default (sequelize, models) => {
  const RoadmapTheme = sequelize.define(
    'RoadmapTheme',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      roadmapId: {
        type: DataTypes.UUID,
        references: { model: 'Roadmap', key: 'id' },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      tooltip: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
    }
  )

  RoadmapTheme.associate = () => {
    RoadmapTheme.belongsTo(models.Roadmap, {
      foreignKey: 'roadmapId',
      as: 'roadmap',
    })
    RoadmapTheme.hasMany(models.RoadmapTopic, {
      foreignKey: 'themeId',
      as: 'topics',
    })
  }

  return RoadmapTheme
}
