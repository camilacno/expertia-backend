import { DataTypes } from 'sequelize'

export default (sequelize, models) => {
  const Topic = sequelize.define(
    'Topic',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      themeId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tooltip: {
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: true,
    }
  )

  Topic.associate = () => {
    Topic.belongsTo(models.Theme, {
      foreignKey: 'themeId',
      as: 'theme',
    })
  }

  return Topic
}
