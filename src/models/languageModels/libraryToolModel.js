import { DataTypes, Sequelize } from 'sequelize'

export default (sequelize) => {
  const LibraryTool = sequelize.define(
    'LibraryTool',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      languageId: {
        type: DataTypes.UUID,
        references: { model: 'Language', key: 'id' },
      },
    },
    {
      indexes: [{ unique: false, fields: ['name'] }],
    },
    {
      timestamps: true,
    }
  )

  return LibraryTool
}

LibraryTool.belongsToMany(models.Quizz, {
  through: QuizzLibraryTool,
  foreignKey: 'libraryToolId',
  otherKey: 'quizzId',
})
