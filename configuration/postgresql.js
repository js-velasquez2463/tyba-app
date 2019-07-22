const Sequelize = require('sequelize')

/**
* Initial configuration of the MySQL database
*/
const sequelize = new Sequelize(process.env.PSQL_URL, {
  dialect: 'postgres',
  pool: {
    max: 50,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established POSTGRESQL')
  })
  .catch(err => {
    console.error('Unable to connect to POSTGRESQL:', err)
  })

module.exports = sequelize
