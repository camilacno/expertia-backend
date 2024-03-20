import { DataTypes } from 'sequelize'

export default (sequelize, models) => {
  const Roadmap = sequelize.define(
    'Roadmap',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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

  Roadmap.associate = () => {
    Roadmap.hasMany(models.RoadmapTheme, {
      foreignKey: 'roadmapId',
      as: 'themes',
    })
  }

  return Roadmap
}
