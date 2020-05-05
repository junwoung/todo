import React from 'react'
import Dialog from '../frame/dialog/dialog';
import Apis from '../apis';
import Utils from '../frame/utils/utils';

class TodoAdd extends React.Component {
  constructor () {
    super()
    this.state = {
      title: ''
    }
  }
  setTitle = (e) => {
    this.setState({
      title: e.target.value
    })
  }
  submitTodo = async () => {
    if (this.state.title === '') {
      return Dialog.msg('请先输入TODO事件！')
    }
    let id = Dialog.loading('正在提交todo事件')
    let res = await Apis.todo.add({title: this.state.title})
    Dialog.close(id)
    Utils.dealRes(res, () => {
      Dialog.success('todo事件创建成功')
      this.setState({
        title: ''
      })
      this.props.addSuccess()
    })
  }
  cancelAdd = () => {
    this.props.cancelAdd()
  }
  keyUp = (e) => {
    switch (e.keyCode) {
      case 13:
        this.submitTodo()
        break
      default: {}
    }
  }
  render () {
    return (
      <div className='todo-add-wrap'>
        <div>
          <input value={this.state.title} onChange={this.setTitle} onKeyUp={this.keyUp} className='todo-add' placeholder='请输入待办事项，最长支持256字符...' maxLength='256' type='text' />
        </div>
        <div className='todo-add-btns'>
          <button onClick={this.submitTodo} className='btn btn-default'>提交</button>
          <button onClick={this.cancelAdd} className='btn btn-minor'>取消</button>
        </div>
      </div>
    )
  }
}

export default TodoAdd