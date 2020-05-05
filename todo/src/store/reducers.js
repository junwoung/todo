import { combineReducers } from 'redux'
import defaultState from './state'

function isLogin (state = defaultState.isLogin, action) {
  switch (action.type) {
    case 'SET_LOGIN_STATE':
      return action.data
    default:
      return state
  }
}

function loginUser (state = defaultState.loginUser, action) {
  switch (action.type) {
    case 'SET_LOGIN_USER':
      return action.data
    default:
      return state
  }
}

export default combineReducers({
  isLogin,
  loginUser
})