import { DataTypes, Sequelize } from 'sequelize'

export default (sequelize) => {
  const Framework = sequelize.define(
    'Framework',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      languageId: {
        type: DataTypes.UUID,
        references: { model: 'Language', key: 'id' },
      },
    },
    {
      timestamps: true,
    }
  )

  return Framework
}

Framework.belongsToMany(models.Quizz, {
  through: QuizzFramework,
  foreignKey: 'frameworkId',
  otherKey: 'quizzId',
})
