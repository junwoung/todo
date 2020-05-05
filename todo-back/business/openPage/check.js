const Utils = require('../utils/utils')

class CheckUser {
  static isAdmin (req, res, next) {
    if (req.user.usertype !== 0) {
      res.send(Utils.seal('FORBIDDEN'))
      return
    }
    next()
  }
}

module.exports = CheckUser