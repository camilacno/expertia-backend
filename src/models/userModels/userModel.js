import { DataTypes, Sequelize } from 'sequelize'

export default (sequelize) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM('client', 'guest'),
        allowNull: false,
      },
      clientId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'User',
          key: 'id',
        },
      },
    },
    {
      timestamps: true,
    }
  )

  User.associate = (models) => {
    User.hasMany(models.User, { as: 'guests', foreignKey: 'clientId' })
    User.belongsTo(models.User, { as: 'client', foreignKey: 'clientId' })
  }

  return User
}
