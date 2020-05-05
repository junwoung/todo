const expressSession = require('express-session')
//  定义免校验接口白名单
const menus = ['/user/login', '/user/register']

module.exports = class Session {
  //  设置session
  static setSession () {
    return expressSession({
      secret: 'todo',
      resave: false,
      saveUninitialized: true,
      cookie: {
        //  过期时间
        maxAge: 30 * 60 * 1000
      }
    })
  }

  //  判断用户登录信息是否过期
  static isExpired (req, res, next) {
    if (menus.includes(req.url)) {
      next()
      return
    }
    if (req.session.user) {
      //  校验通过后手动刷新过期时间
      req.session._garbage = Date()
      req.session.touch()
      req.user = req.session.user
      next()
    } else {
      res.send({ status: 403, desc: '登录已过期，请重新登录' })
    }
  }
}