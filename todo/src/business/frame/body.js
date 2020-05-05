import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

//  业务组件
import LoginPage from '../login/login'
import RegisterPage from '../login/register'
import TodoPage from '../todo/index'
import UserData from '../userData/index'

const routes = (
  <BrowserRouter>
    <Route path='/login' component={LoginPage} />
    <Route path='/register' component={RegisterPage} />
    <Route path='/todo' component={TodoPage} />
    <Route path='/user/data' component={UserData} />
  </BrowserRouter>
)

class FrameBody extends React.Component {
  render () {
    return (
      <div className='frame-body'>
        { routes }
      </div>
    )
  }
}

export default FrameBody