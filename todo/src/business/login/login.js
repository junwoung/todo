import React from 'react'
import './login.css'
import Dialog from '../frame/dialog/dialog'
import Apis from '../apis'
import Utils from '../frame/utils/utils'
import { connect } from 'react-redux'
import { setLoginState, setLoginUser } from '../../store/action'

class LoginPage extends React.Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      isRemember: false
    }
  }
  componentDidMount () {
    if (localStorage.LOGIN_USER) {
      let state = JSON.parse(localStorage.LOGIN_USER)
      this.setState({
        ...state
      })
    }
  }
  setFormValue = (e) => {
    let target = e.target
    let name = target.name
    let val = target.value
    this.setState({
      [name]: val
    })
  }
  setRemember () {
    this.setState({
      isRemember: this.state.isRemember ? false : true
    })
  }
  async goLogin () {
    let msg = this.checkParams()
    if (msg) {
      return Dialog.msg(msg)
    }
    let id = Dialog.loading('正在登陆')
    let res = await Apis.user.login(this.state)
    Dialog.close(id)
    Utils.dealRes(res, async () => {
      Dialog.success('登陆成功')
      if (this.state.isRemember) {
        //  如果是记住登录则将登录信息写入localStorage
        localStorage.LOGIN_USER = JSON.stringify(this.state)
      } else {
        localStorage.clear()
      }
      localStorage.LOGIN_TOKEN = res.data.token
      sessionStorage.LOGIN_TOKEN = res.data.token
      sessionStorage.LOGIN_USER = JSON.stringify(res.data.user)
      //  将登录信息写入redux
      this.props.setLoginState(true)
      this.props.setLoginUser(res.data.user)
      //  根据用户权限，跳转到todo主页或者用户数据页面
      await Utils.sleep(10)
      if (res.data.user.usertype === 0) {
        this.props.history.push('/user/data')
      } else {
        // this.props.history.push('/todo')
        window.location.href = '/todo'
      }
    })
  }
  checkParams () {
    let form = this.state
    if (!form.username || !form.password) {
      return '请输入用户名或密码'
    }
    return false
  }
  keyUp = (e) => {
    switch (e.keyCode) {
      case 13:
        this.goLogin()
        break
      default: {}
    }
  }
  render () {
    let form = this.state
    return (
      <div className='login-outer-wrap'>
        <div className='login-wrap'>
          <div className='row'>
            <label className='label'>用户名:</label>
            <input
              className='input'
              name='username'
              value={form.username}
              onChange={this.setFormValue}
              onKeyUp={this.keyUp}
              type='text'
              placeholder='请输入用户名' />
          </div>
          <div className='row'>
            <label className='label'>密码:</label>
            <input
              className='input'
              name='password'
              value={form.password}
              onChange={this.setFormValue}
              onKeyUp={this.keyUp}
              type='password'
              placeholder='请输入密码' />
          </div>
          <div className='row'>
            <label className='label'></label>
            <button onClick={this.goLogin.bind(this)} className='btn btn-default btn-login'>登录</button>
          </div>
          <div className='row'>
            <label className='label'></label>
            <label className='remember-login'>
              <input type='checkbox' checked={form.isRemember} onChange={this.setRemember.bind(this)}/>
              记住登录
            </label>
            <a href='/register' className='a a-hover go-register'>去注册&gt;&gt;</a>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    loginUser: state.loginUser
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setLoginState (data) {
      dispatch(setLoginState(data))
    },
    setLoginUser (data) {
      dispatch(setLoginUser(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)