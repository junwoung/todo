const seq = require('sequelize')
const conn = require('./sequelize')
const moment = require('moment')

const Todo = conn.define('todo', {
  id: {
    type: seq.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: seq.INTEGER,
    allowNull: false
  },
  title: {
    type: seq.STRING(256),
    allowNull: false
  },
  status: {
    type: seq.TINYINT(1)
  },
  create_time: {
    type: seq.TIME,
    get () {
      return moment(this.getDataValue('create_time')).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  update_time: {
    type: seq.TIME,
    get () {
      return moment(this.getDataValue('update_time')).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}, {
  freezeTableName: true,
  timestamps: false,
  tableName: 'todo',
  underscored: true
})

module.exports = Todo