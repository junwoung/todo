const OpenPage = require('../sequelize/openPage')
const seq = require('sequelize')

class OpenPageModel {
  static addReport (params) {
    return new Promise ((resolve, reject) => {
      OpenPage.create(params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static getAvg () {
    return new Promise((resolve, reject) => {
      OpenPage.findOne({
        attributes: [
          [ seq.fn('AVG', seq.col('white_time')), 'white' ],
          [ seq.fn('AVG', seq.col('loaded_time')), 'loaded' ]
        ]
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

module.exports = OpenPageModel