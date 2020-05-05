const Log = require('../sequelize/log')
const moment = require('moment')
const seq = require('sequelize')
const Op = seq.Op

class UserDataModel {
  static getDAU (start, end) {
    return new Promise((resolve, reject) => {
      Log.findAll({
        where: {
          create_time: { [Op.between]: [start, end] }
        },
        group: 'user_id',
        attributes: [[seq.fn('DISTINCT', seq.col('user_id')), 'uid']]
      }).then(res => {
        resolve(res.length)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static getWeeks () {
    let timestamp = Date.now()
    let end = moment(timestamp).format('YYYY-MM-DD')
    let start = moment(timestamp - 6 * 24 * 3600 * 1000).format('YYYY-MM-DD')
    return new Promise((resolve, reject) => {
      Log.findAll({
        where: {
          create_time: { [Op.between]: [start, end] }
        },
        group: ['create_date', 'uid'],
        // distinct: 'user_id',
        attributes: [
          [seq.fn('DISTINCT', seq.col('user_id')), 'uid'],
          [seq.fn('date_format', seq.col('log.create_time'), '%Y-%m-%d'), 'create_date']
        ]
      })
      .then(res => {
        let result = res.reduce((t, c) => {
          let date = c.dataValues.create_date
          if (t[date]) {
            t[date]++
          } else {
            t[date] = 1
          }
          return t
        }, {})
        resolve(result)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

module.exports = UserDataModel