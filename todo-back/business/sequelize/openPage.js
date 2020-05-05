const seq = require('sequelize')
const conn = require('./sequelize')
const moment = require('moment')

const OpenPage = conn.define('open_page', {
  id: {
    type: seq.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: seq.INTEGER(11)
  },
  white_time: {
    type: seq.INTEGER(8)
  },
  loaded_time: {
    type: seq.INTEGER(8)
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
  tableName: 'open_page',
  underscored: true
})

module.exports = OpenPage