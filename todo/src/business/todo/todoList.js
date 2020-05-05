import React from 'react'
import Dialog from '../frame/dialog/dialog';
import Apis from '../apis';
import Utils from '../frame/utils/utils';

class TodoList extends React.Component {
  render () {
    return (
      <ul>
        {
          this.props.todos.map((todo, idx) => {
            return <TodoItem updateSuccess={this.props.updateSuccess} idx={idx} item={todo} key={todo.id} />
          })
        }
      </ul>
    )
  }
}

class TodoItem extends React.Component {
  constructor () {
    super()
    this.state = {
      showDetail: false
    }
  }
  showDetail = () => {
    this.setState({
      showDetail: !this.state.showDetail
    })
  }
  setTodoStatus = (status) => {
    if (this.props.item.status !== 0) return
    Dialog.confirm({
      msg: `确定将todo状态修改为${status === 1 ? '已办' : '废弃'}？`,
      ensureFn: () => {
        (async () => {
          let res = await Apis.todo.updateStatus(this.props.item.id, status)
          Utils.dealRes(res, () => {
            Dialog.success('todo状态修改成功')
            this.props.updateSuccess()
          })
        })()
      }
    })
  }
  editTodo = () => {
    if (this.props.item.status !== 0) return
    Dialog.prompt({
      type: 'textarea',
      title: '请修改todo信息',
      val: this.props.item.title,
      ensureFn: (msg) => {
        if (msg === '') {
          return Dialog.msg('todo信息不可为空')
        }
        (async () => {
          let res = await Apis.todo.edit(this.props.item.id, {title: msg})
          Utils.dealRes(res, () => {
            Dialog.success('todo信息修改成功')
            this.props.updateSuccess()
          })
        })()
      }
    })
  }
  render () {
    const item = this.props.item
    let classNames = 'todo-item-title'
    if (!this.state.showDetail) {
      classNames += ' todo-item-title-ellipsis'
    }
    let itemClasses = 'todo-item clearfix'
    switch (this.props.item.status) {
      case 1:
        itemClasses += ' todo-item-finished'
        break
      case 2:
        itemClasses += ' todo-item-discard'
        break
      default: {}
    }
    return (
      <li className={itemClasses}>
        <div className='todo-item-idx'>{this.props.idx + 1}.</div>
        <div className={classNames}>{item.title}</div>
        <div className='todo-item-operations'>
          <div className='col'>
            {
              item.status === 1 ?
              (<label className='todo-finished'>事件已办</label>) :
              (<span onClick={this.setTodoStatus.bind(this, 1)} className='btn-edit'>设为已办</span>)
            }
          </div>
          <div className='col'>
            {
              item.status === 2 ?
              (<label className='todo-discard'>事件已废弃</label>) :
              (<span onClick={this.setTodoStatus.bind(this, 2)} className='btn-edit'>废弃</span>)
            }
          </div>
          <div className='col'><span onClick={this.editTodo} className='btn-edit'>修改</span></div>
          <div className='col'><span onClick={this.showDetail} className='show-detail'>{this.state.showDetail ? '收起' : '查看'}详情</span></div>
        </div>
      </li>
    )
  }
}

export default TodoList