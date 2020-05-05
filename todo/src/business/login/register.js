import React from 'react'
import Utils from '../frame/utils/utils'
import Dialog from '../frame/dialog/dialog';
import Apis from '../apis';

class RegisterPage extends React.Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      ensurePassword: '',
      error: {}
    }
  }
  setFormValue = (e) => {
    let target = e.target
    let val = target.value
    let name = target.name
    this.setState({
      [name]: val
    })
    this.checkForm(name)
  }
  submitForm = async () => {
    let errors = await this.checkForm()
    if (errors === 0) {
      let params = Utils.withdrawObjKeys(this.state, ['username', 'password'])
      let id = Dialog.loading('正在注册')
      let res = await Apis.user.register(params)
      Dialog.close(id)
      Utils.dealRes(res, () => {
        Dialog.success('注册成功', 2000, () => {
          this.props.history.push('/login')
        })
      })
    } else {
      Dialog.msg('表单不完整，请完善')
    }
  }
  checkForm = async (name) => {
    await Utils.sleep(0)
    let form = this.state
    let errors = {}
    if (!name) {
      checkUsername()
      checkPassword()
      checkEnsurePassword()
    } else {
      switch (name) {
        case 'username':
          checkUsername()
          break
        case 'password':
          checkPassword()
          break
        case 'ensurePassword':
          checkEnsurePassword()
          break
        default: {}
      }
    }
    this.setState({
      error: errors
    })
    return Object.keys(errors).length
    function checkUsername () {
      if (!form.username) {
        errors.username = '用户名不可为空'
      }
    }
    function checkPassword () {
      if (!form.password) {
        errors.password = '登录密码不可为空'
      }
    }
    function checkEnsurePassword () {
      if (!form.ensurePassword) {
        errors.ensurePassword = '确认密码不可为空'
      } else {
        if (form.password !== form.ensurePassword) {
          errors.ensurePassword = '确认密码与登录密码不一致'
        }
      }
    }
  }
  resetForm = () => {
    this.setState({
      error: {},
      username: '',
      password: '',
      ensurePassword: ''
    })
  }
  render () {
    let form = this.state
    let errors = this.state.error
    return (
      <div className='login-outer-wrap'>
        <div className='login-wrap'>
          <div className='row'>
            <label className='label label-register'>用户名:</label>
            <input className='input' value={form.username} onChange={this.setFormValue} name='username' maxLength='16' type='text' placeholder='请输入用户名' />
            <ErrorTip msg={errors.username} />
          </div>
          <div className='row'>
            <label className='label label-register'>登录密码:</label>
            <input className='input' value={form.password} onChange={this.setFormValue} name='password' maxLength='16' type='password' placeholder='请输入登录密码' />
            <ErrorTip msg={errors.password} />
          </div>
          <div className='row'>
            <label className='label label-register'>确认密码:</label>
            <input className='input' value={form.ensurePassword} onChange={this.setFormValue} name='ensurePassword' maxLength='16' type='password' placeholder='请输入确认密码' />
            <ErrorTip msg={errors.ensurePassword} />
          </div>
          <div className='row'>
            <button onClick={this.submitForm} className='btn btn-default btn-register-submit'>注册</button>
            <button onClick={this.resetForm} className='btn btn-minor btn-register-reset'>重置</button>
          </div>
        </div>
      </div>
    )
  }
}

export default RegisterPage

class ErrorTip extends React.Component {
  render () {
    return (
      <span className='error-tip'>{this.props.msg}</span>
    )
  }
}