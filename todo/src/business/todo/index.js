import React from 'react'
import Dialog from '../frame/dialog/dialog';
import Apis from '../apis';
import './todo.css'
import TodoAdd from './todoAdd'
import TodoList from './todoList'
import TodoFilter from './todoFilter'
import Utils from '../frame/utils/utils';

class TodoPage extends React.Component {
  constructor () {
    super()
    this.state = {
      onAdd: false,
      todos: []
    }
  }
  componentDidMount () {
    if (!sessionStorage.LOGIN_USER) {
      Dialog.confirm({
        msg: '请您先登录',
        closeFn: false,
        cancelFn: false,
        modalFn: false,
        ensureFn: () => {
          this.props.history.push('/login')
        }
      })
    } else {
      this.getTodoList()
    }
  }
  getTodoList = async (status) => {
    let param = {}
    status && status.length && (param.status = status.join(','))
    let res = await Apis.todo.list(param)
    Utils.dealRes(res, () => {
      this.setState({
        todos: res.data
      })
    })
  }
  addTodo = () => {
    this.setState({
      onAdd: true
    })
  }
  cancelAdd = () => {
    this.setState({
      onAdd: false
    })
  }
  render () {
    let state = this.state
    return (
      <div className='content-outer'>
        <div className='content-wrap'>
          <div className='row clearfix' style={{marginTop: '30px'}}>
            <div className='col left todo-title'>您的TODO列表</div>
            <div className='col right' style={{display: state.onAdd ? 'none' : ''}}>
              <button onClick={this.addTodo} className='btn btn-green'>+添加</button>
            </div>
          </div>
          <div className={state.onAdd ? '' : 'hide'}>
            <TodoAdd addSuccess={this.getTodoList} cancelAdd={this.cancelAdd} />
          </div>
          <div>
            <TodoFilter checkStatus={this.getTodoList} />
          </div>
          <div className='todo-list'>
            <TodoList updateSuccess={this.getTodoList} todos={state.todos} />
          </div>
        </div>
      </div>
    )
  }
}

export default TodoPage


window.onload = function () {
  if (window.location.pathname !== '/todo') return
  setTimeout(() => {
    let t = performance.timing
    //  白屏时间
    let whiteScreen = t.responseStart - t.navigationStart
    //  onload时间
    let onload = t.loadEventEnd - t.navigationStart
    Apis.openPage.report({
      white: whiteScreen,
      loaded: onload
    })
  }, 0)
}