import { DataTypes, Sequelize } from 'sequelize'
import bcrypt from 'bcrypt'

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
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM('client', 'guest'),
        allowNull: false,
      },
      userId: {
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

  User.beforeCreate(async (user, options) => {
    const hashedPassword = await bcrypt.hash(user.password, 10)
    user.password = hashedPassword
  })

  User.beforeUpdate(async (user, options) => {
    if (user.changed('password')) {
      const hashedPassword = await bcrypt.hash(user.password, 10)
      user.password = hashedPassword
    }
  })

  User.associate = (models) => {
    User.hasMany(models.User, { as: 'guest', foreignKey: 'userId' })
    User.belongsTo(models.User, { as: 'client', foreignKey: 'userId' })
  }

  return User
}
