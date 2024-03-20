import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const AISuggestedTopic = sequelize.define('AISuggestedTopic', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    topic: { type: DataTypes.STRING, allowNull: false },
  })

  AISuggestedTopic.associate = (models) => {
    AISuggestedTopic.belongsTo(models.AISuggestedTheme, {
      foreignKey: 'themeId',
      as: 'theme',
    })
  }

  return AISuggestedTopic
}
