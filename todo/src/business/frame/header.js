import React from 'react'
import { connect } from 'react-redux'
import Apis from '../apis';
import Utils from './utils/utils';

class FrameHeader extends React.Component {
  logout = async () => {
    let res = await Apis.user.logout(this.props.loginUser.id)
    Utils.dealRes(res)
    sessionStorage.clear()
  }
  render () {
    const style = {
      fontSize: '16px',
      color: '#444',
      display: this.props.isLogin ? 'none' : ''
    }
    let userAreaClasses = 'right frame-user'
    if (!this.props.isLogin) userAreaClasses += ' hide'
    return (
      <div className='frame-header'>
        Welcome to Todo!&nbsp;
        <span style={style}>
          Please <a href='/login' className='a a-hover'>login</a>&nbsp;
          or&nbsp;
          <a href='/register' className='a a-hover'>register</a>.
        </span>
        <div className={userAreaClasses}>
          <span>欢迎，{this.props.loginUser.username}</span>
          <a href='/login' onClick={this.logout} className='login-out-btn'>退出</a>
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

export default connect(mapStateToProps)(FrameHeader)