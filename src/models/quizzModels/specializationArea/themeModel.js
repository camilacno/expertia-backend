import { DataTypes } from 'sequelize'

export default (sequelize, models) => {
  const Theme = sequelize.define(
    'Theme',
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
      tooltip: {
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: true,
    }
  )

  Theme.associate = () => {
    Theme.belongsToMany(models.SpecializationArea, {
      through: 'SpecializationAreasThemes',
      foreignKey: 'themeId',
      otherKey: 'specializationAreaId',
    })
    Theme.hasMany(models.Topic, {
      foreignKey: 'themeId',
      as: 'topics',
    })
  }

  return Theme
}
