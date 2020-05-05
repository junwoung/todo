const Log = require('../sequelize/log')

class LogModel {
  static addLog (userId, module, type, desc, ip) {
    return new Promise((resolve, reject) => {
      Log.create({
        user_id: userId,
        module: module,
        type: type,
        description: desc,
        ip: ip
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

LogModel.MODULE_OTHERS = 0
LogModel.MODULE_USER = 1
LogModel.MODULE_TODO = 2

LogModel.OPERATE_OTHERS = 0
LogModel.OPERATE_LOGIN = 1
LogModel.OPERATE_REGISTER = 2
LogModel.OPERATE_ADD = 3
LogModel.OPERATE_DELETE = 4
LogModel.OPERATE_UPDATE = 5

module.exports = LogModel