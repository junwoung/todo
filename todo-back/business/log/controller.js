const LogModel = require('./model')

module.exports = class LogController {
  static async addLog (userId, module, type, desc, ip) {
    let result
    try {
      result = await LogModel.addLog(userId, module, type, desc, ip)
    } catch (e) {
      console.log(e)
    }
  }
}