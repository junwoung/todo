import axios from 'axios'
import Dialog from '../frame/dialog/dialog'

function send (url, method = 'get', data) {
  method = method.toLowerCase()
  return new Promise((resolve, reject) => {
    if (method === 'get') {
      axios({
        url: url,
        method: 'get',
        params: data
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    } else {
      axios[method](url, data).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    }
  })
}

//  设置请求接口白名单，名单内的请求不做拦截
const menus = ['/user/login', '/user/register']
axios.interceptors.request.use(
  config => {
    if (menus.includes(config.url)) {
      return config
    }
    let token = sessionStorage.LOGIN_TOKEN
    if (!token) {
      window.location.href = '/login'
      return config
    }
    config.headers['X-Token'] = token
    return config
  }
)

axios.interceptors.response.use(
  response => {
    if (response.data.status === 403) {
      sessionStorage.clear()
      Dialog.confirm({
        msg: '登录已经过期，请重新登录！',
        modalFn: false,
        cancelFn: false,
        closeFn: false,
        ensureFn: () => {
          window.location.href = '/login'
        }
      })
    }
    return response
  }
)

export default send