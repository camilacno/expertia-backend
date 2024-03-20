import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const AISuggestedTheme = sequelize.define('AISuggestedTheme', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    theme: { type: DataTypes.STRING, allowNull: false },
  })

  AISuggestedTheme.associate = (models) => {
    AISuggestedTheme.hasMany(models.AISuggestedTopic, {
      foreignKey: 'themeId',
      as: 'topics',
    })
    AISuggestedTheme.belongsTo(models.Quizz, { foreignKey: 'quizzId' })
  }

  return AISuggestedTheme
}
