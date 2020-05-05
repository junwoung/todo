import React from 'react'

class TodoFilter extends React.Component {
  constructor () {
    super()
    this.state = {
      checked: []
    }
  }
  setChecked = (e) => {
    let checked = this.state.checked
    let target = e.target
    let val = +target.value
    let idx = checked.indexOf(val)
    if (idx === -1) {
      checked.push(val)
    } else {
      checked.splice(idx, 1)
    }
    this.setState({
      checked: checked
    })
    this.props.checkStatus(checked)
  }
  render () {
    let checked = this.state.checked
    return (
      <div className='todo-filter'>
        <label className='label'>选择过滤条件:</label>
        <label><input checked={checked.includes(0)} onChange={this.setChecked} type='checkbox' value='0' name='status'/>待办</label>
        <label><input checked={checked.includes(1)} onChange={this.setChecked} type='checkbox' value='1' name='status'/>已办</label>
        <label><input checked={checked.includes(2)} onChange={this.setChecked} type='checkbox' value='2' name='status'/>废弃</label>
      </div>
    )
  }
}

export default TodoFilter