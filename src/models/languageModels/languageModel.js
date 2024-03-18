import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const Language = sequelize.define(
    'Language',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  )

  return Language
}

Language.belongsToMany(models.Quizz, {
  through: QuizzLanguage,
  foreignKey: 'languageId',
  otherKey: 'quizzId',
})
