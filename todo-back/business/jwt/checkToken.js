/**
 * 定义token拦截中间件
 */
const Jwt = require('./token')
//  定义免校验接口白名单
const menus = ['/user/login', '/user/register']

module.exports = function checkToken (req, res, next) {
  if (menus.includes(req.url)) {
    next()
  } else {
    let token = req.headers['x-token']
    let jwt = new Jwt(token)
    let result = jwt.verifyToken()
    if (result === 'err') {
      res.send({ status: 403, desc: '登录已过期，请重新登录' })
    } else {
      //  将解析到的token数据通过req在中间件间传递
      req.user = result
      next()
    }
  }
}