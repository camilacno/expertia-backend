import { DataTypes, Sequelize } from 'sequelize'

export default (sequelize) => {
  const Link = sequelize.define(
    'Link',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: { type: DataTypes.STRING, allowNull: false },
      url: { type: DataTypes.TEXT, allowNull: false },
    },
    {
      timestamps: true,
    }
  )

  return Link
}
