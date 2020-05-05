import Dialog from '../dialog/dialog'

export default class Utils {
  /**
   * 统一处理请求结果
   * @param {请求获取的对象} res 
   * @param {成功回调} fn 
   */
  static dealRes (res, fn) {
    if (!res) {
      return Dialog.error('返回参数为空')
    }
    if (res.code !== 0) {
      return Dialog.error(res.desc)
    }
    fn && fn()
  }

  /**
   * 延时函数
   * @param {延时秒数ms} timer
   * @return {promise对象}
   */
  static sleep (timer = 0) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, timer)
    })
  }

  /**
   * 提取对象指定属性，并返回一个新对象
   * @param {数据对象} obj 
   * @param {属性数组} keys 
   * @return {新对象}
   */
  static withdrawObjKeys (obj, keys) {
    return keys.reduce((ret, key) => {
      ret[key] = obj[key]
      return ret
    }, {})
  }
}