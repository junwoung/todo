import React from 'react'
import './frame.css'
import FrameHeader from './header'
import FrmaeBody from './body'
import { connect } from 'react-redux'
import { setLoginState, setLoginUser } from '../../store/action'

class Frame extends React.Component {
  componentDidMount () {
    let user = sessionStorage.LOGIN_USER
    if (user) {
      user = JSON.parse(user)
      this.props.setLoginState(true)
      this.props.setLoginUser(user)
    } else {
      this.props.setLoginState(false)
    }
  }
  render () {
    return (
      <div className='frame-wrap'>
        <FrameHeader />
        <FrmaeBody />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    isLogin: state.isLogin,
    loginUser: state.loginUser
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    setLoginState (data) {
      dispatch(setLoginState(data))
    },
    setLoginUser (data) {
      dispatch(setLoginUser(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Frame)