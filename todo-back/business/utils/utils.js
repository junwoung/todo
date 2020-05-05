const maps = {
  'SUCCESS': { code: 0, desc: '成功' },
  'PARAMS_MISS': { code: 400, desc: '参数缺少' },
  'PARAMS_ERROR': { code: 400, desc: '参数错误' },
  'FORBIDDEN': { code: 403, desc: '无相关资源访问权限' },
  'NOT_FOUND': { code: 404, desc: '资源未找到' },
  'INTERNAL_ERROR': {code: 500, desc: '内部错误' },
  'UNKNOWN_ERROR': { code: 500, desc: '未知错误' }
}

module.exports = class Utils {
  static seal (type, msg) {
    let ret = maps[type]
    if (!ret) {
      ret = maps['UNKNOWN_ERROR']
    }
    if (msg) {
      ret.desc = msg
    }
    return ret
  }

  static sealRes (data) {
    let ret = maps['SUCCESS']
    data && (ret.data = data)
    return ret
  }

  static getIp (req) {
    return req.headers['x-forwarded-for'] || 
      req.connection.remoteAddress || 
      req.socket.remoteAddress || 
      req.connection.socket.remoteAddress
  }
}