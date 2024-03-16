import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(process.env.POSTGRES_CONNECTION_STRING, {
  dialect: 'postgres',
  define: {
    timestamps: true,
    underscored: true,
  },
})

export default sequelize
