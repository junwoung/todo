const seq = require('sequelize')
const conn = require('./sequelize')
const moment = require('moment')

const User = conn.define('user', {
  id: {
    type: seq.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: seq.STRING(16),
    allowNull: false,
    validate: {
      len: {
        args: [1, 16],
        msg: '用户名长度需在1-16长度'
      }
    }
  },
  password: {
    type: seq.STRING(32)
  },
  usertype: {
    type: seq.TINYINT,
    validate: {
      isIn: [[0, 1, 2]]
    }
  },
  register_time: {
    type: seq.DATE,
    get () {
      return moment(this.getDataValue('register_time')).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}, {
  freezeTableName: true,
  timestamps: false,
  tableName: 'user',
  underscored: true
})

module.exports = User