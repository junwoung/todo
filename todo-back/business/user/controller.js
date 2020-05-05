const UserModel = require('./model')
const Utils = require('../utils/utils')
const LogModel = require('../log/model')
const md5 = require('md5-node')
const Jwt = require('../jwt/token')

module.exports = class UserController {
  //  用户登录检查
  static async login (req, res, next) {
    let find = await UserModel.getUserByName(req.body.username.trim())
    if (!find) {
      return res.send(Utils.seal('NOT_FOUND', '用户不存在'))
    }
    if (find.password !== md5(req.body.password.trim())) {
      return res.send(Utils.seal('PARAMS_ERROR', '用户名或密码错误'))
    }
    //  生成token
    let userToken = {
      id: find.id,
      username: find.username,
      usertype: find.usertype
    }
    req.session.user = userToken
    //  token模式
    // let jwt = new Jwt(userToken)
    // let token = jwt.generateToken()
    let data = {
      user: find,
      // token: token
    }
    //  记录登陆日志
    LogModel.addLog(find.id, LogModel.MODULE_USER, LogModel.OPERATE_LOGIN, `用户${find.username} 登陆成功`, Utils.getIp(req))
    res.send(Utils.sealRes(data))
  }

  static logout (req, res, next) {
    if (req.session && req.session.user) {
      if (req.session.user.id !== +req.params.id) {
        res.send(Utils.sealRes('FORBIDDEN', '您无权限下线该用户'))
        return
      }
      req.session.user = undefined
    }
    res.send(Utils.sealRes('success'))
  }

  //  注册用户
  static async register (req, res, next) {
    let exist = await UserModel.getUserByName(req.body.username)
    if (exist) {
      return res.send(Utils.seal('PARAMS_ERROR', '用户名存在'))
    }
    let params = req.body
    params.password = md5(req.body.password)
    //  注册的都是普通用户
    params.type = UserModel.NORMAL
    try {
      let data = await UserModel.createUser(params)
      LogModel.addLog(data.id, LogModel.MODULE_USER, LogModel.OPERATE_REGISTER, `用户${params.username}注册成功`, Utils.getIp(req))
      res.send(Utils.sealRes(data.id))
    } catch (e) {
      res.send(Utils.seal('INTERNAL_ERROR'))
    }
  }
}