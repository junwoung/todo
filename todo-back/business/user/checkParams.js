module.exports = class UserCheck {
  static login (req, res, next) {
    if (!req.body.username || !req.body.password) {
      return res.send(Utils.seal('PARAMS_MISS', '用户名和密码必填'))
    }
    next()
  }

  static register (req, res, next) {
    UserCheck.login(req, res, next)
  }
}