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
        set(value) {
          // Use bcrypt.hash asynchronously
          bcrypt.hash(value, 10, (err, hash) => {
            if (err) {
              console.error('Error hashing password:', err)
              throw err
            }
            this.setDataValue('password', hash)
          })
        },
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

  User.associate = (models) => {
    User.hasMany(models.User, { as: 'guest', foreignKey: 'userId' })
    User.belongsTo(models.User, { as: 'client', foreignKey: 'userId' })
  }

  return User
}
