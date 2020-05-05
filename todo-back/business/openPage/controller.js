const OpenPageModel = require('./model')
const Utils = require('../utils/utils')

class OpenPageController {
  static async addReport (req, res, next) {
    if (req.body.white === undefined || req.body.loaded === undefined) {
      res.send(Utils.seal('PARAMS_MISS', '白屏时间和loaded时间必传'))
    }
    let params = {
      white_time: req.body.white,
      loaded_time: req.body.loaded,
      user_id: req.user.id
    }
    try {
      await OpenPageModel.addReport(params)
      res.send(Utils.sealRes('success'))
    } catch (e) {
      res.send(Utils.seal('INTERNAL_ERROR', '上报失败'))
    }
  }

  static async getAvg (req, res, next) {
    try {
      let result = await OpenPageModel.getAvg()
      res.send(Utils.sealRes(result))
    } catch (e) {
      res.send(Utils.seal('INTERNAL_ERROR', '获取页面打开平均时间错误：' + e))
    }
  }
}

module.exports = OpenPageController