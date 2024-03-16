import { DataTypes } from 'sequelize'

export default (sequelize, models) => {
  const SpecializationArea = sequelize.define(
    'SpecializationArea',
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
      label: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: true,
    }
  )

  SpecializationArea.associate = () => {
    SpecializationArea.belongsToMany(models.Theme, {
      through: 'SpecializationAreasThemes',
      foreignKey: 'specializationAreaId',
      otherKey: 'themeId',
    })
  }

  return SpecializationArea
}
