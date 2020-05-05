const seq = require('sequelize')
const conn = require('./sequelize')
const moment = require('moment')

const Log = conn.define('log', {
  id: {
    type: seq.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: seq.INTEGER(11)
  },
  module: {
    type: seq.TINYINT(1)
  },
  type: {
    type: seq.TINYINT(1)
  },
  description: {
    type: seq.STRING(64)
  },
  ip: {
    type: seq.STRING(15)
  },
  create_time: {
    type: seq.TIME,
    get () {
      return moment(this.getDataValue('create_time')).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}, {
  freezeTableName: true,
  timestamps: false,
  tableName: 'log',
  underscored: true
})

module.exports = Log