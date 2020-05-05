const Sequelize = require('sequelize')
const mysql = require('../../config/mysql')

const conn = new Sequelize(mysql.database, mysql.user, mysql.password, {
  host: mysql.host,
  dialect: 'mysql',
  pool: {
    max: 30,
    min: 1,
    acquire: 30000,
    idle: 10000
  },
  charset: 'utf8',
  logging: false
})

module.exports = conn