import React from 'react'
import Apis from '../apis';
import Utils from '../frame/utils/utils';

class DmtData extends React.Component {
  constructor () {
    super()
    this.state = {
      activity: {}
    }
  }
  componentDidMount () {
    this.getDau()
  }
  getDau = async () => {
    let res = await Apis.userData.dau()
    Utils.dealRes(res, () => {
      this.setState({
        activity: res.data
      })
    })
  }
  render () {
    let activity = this.state.activity
    return (
      <div className='userdata-dmt'>
        <div>
          <label>日活</label>
          <span>{activity.dau}</span>
        </div>
        <div>
          <label>周活</label>
          <span>{activity.wau}</span>
        </div>
        <div>
          <label>月活</label>
          <span>{activity.mau}</span>
        </div>
        <div>
          <label>总用户</label>
          <span>{activity.total}</span>
        </div>
      </div>
    )
  }
}

export default DmtData