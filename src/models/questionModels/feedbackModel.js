import { DataTypes, Sequelize } from 'sequelize'

export default (sequelize) => {
  const Feedback = sequelize.define(
    'Feedback',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: { type: DataTypes.STRING, allowNull: false },
      text: { type: DataTypes.TEXT, allowNull: false },
    },
    {
      timestamps: true,
    }
  )

  return Feedback
}
