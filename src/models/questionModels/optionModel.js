import { DataTypes, Sequelize } from 'sequelize'

export default (sequelize) => {
  const Option = sequelize.define(
    'Option',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      content: { type: DataTypes.STRING, allowNull: false },
      correct: { type: DataTypes.BOOLEAN, allowNull: false },
    },
    {
      timestamps: true,
    }
  )

  return Option
}
