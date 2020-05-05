import send from "./axios";

let Apis = {
  user: {
    login: params => send('/user/login', 'post', params),  //  用户登录
    isExist: name => send(`/user/isExist?username=${name}`),  //  判断用户是否存在
    register: params => send(`/user/register`, 'post', params),
    logout: id => send(`/user/logout/${id}`)
  },
  todo: {
    list: params => send('/todo/list', 'get', params),
    add: params => send('/todo/add', 'post', params),
    updateStatus: (id, status) => send(`/todo/${id}/status/${status}`, 'put'),
    edit: (id, params) => send(`/todo/${id}/edit`, 'put', params)
  },
  userData: {
    dau: () => send('/user/data/dau'),
    weeks: () => send('/user/data/weeks')
  },
  openPage: {
    report: params => send('/open/page/report', 'post', params),
    avg: () => send('/open/page/avg')
  }
}

export default Apis