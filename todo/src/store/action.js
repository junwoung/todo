export function setLoginState (data) {
  return (dispatch, getState) => {
    dispatch({type: 'SET_LOGIN_STATE', data: data})
  }
}

export function setLoginUser (data) {
  return (dispatch, getState) => {
    dispatch({type: 'SET_LOGIN_USER', data: data})
  }
}