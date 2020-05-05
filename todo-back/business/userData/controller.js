const UserDataModel = require('./mode')
const UserModel = require('../user/model')
const Utils = require('../utils/utils')
const moment = require('moment')

class UserDataController {
  static async getDAU (req, res, next) {
    let oneDay = 24 * 3600 * 1000, cur = Date.now()
    let d = moment(cur - oneDay).format('YYYY-MM-DD')
    let w = moment(cur - 7 * oneDay).format('YYYY-MM-DD')
    let m = moment(cur - 30 * oneDay).format('YYYY-MM-DD')
    let d_start = `${d} 00:00:00`, d_end = `${d} 23:59:59`
    let w_start = `${w} 00:00:00`, m_start = `${m} 00:00:00`
    let result = {}
    try {
      // let result = await UserDataModel.getDAU()
      Promise.all([get_d(), get_w(), get_m(), get_t()]).then(() => {
        res.send(Utils.sealRes(result))
      })
    } catch (e) {
      res.send(Utils.seal('INTERVAL_ERROR', '获取用户日活数据失败' + e))
    }

    function get_d () {
      return new Promise(async resolve => {
        let dau = await UserDataModel.getDAU(d_start, d_end)
        result.dau = dau
        resolve()
      })
    }
    function get_w () {
      return new Promise(async resolve => {
        let wau = await UserDataModel.getDAU(w_start, d_end)
        result.wau = wau
        resolve()
      })
    }
    function get_m () {
      return new Promise(async resolve => {
        let mau = await UserDataModel.getDAU(m_start, d_end)
        result.mau = mau
        resolve()
      })
    }
    function get_t () {
      return new Promise(async resolve => {
        let total = await UserModel.countTotalUsers()
        result.total = total
        resolve()
      })
    }
  }

  static async getWeeks (req, res, next) {
    try {
      let result = await UserDataModel.getWeeks()
      res.send(Utils.sealRes(result))
    } catch (e) {
      res.send(Utils.seal('INTERVAL_ERROR', '获取一周日活数据失败' + e))
    }
    
  }
}

module.exports = UserDataController