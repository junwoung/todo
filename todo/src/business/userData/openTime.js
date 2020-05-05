import React from 'react'
import Apis from '../apis';
import Utils from '../frame/utils/utils';

class OpenTime extends React.Component {
  constructor () {
    super()
    this.state = {
      time: {}
    }
  }
  componentDidMount () {
    this.getAvg()
  }
  async getAvg () {
    let res = await Apis.openPage.avg()
    Utils.dealRes(res, () => {
      this.setState({
        time: res.data
      })
    })
  }
  render () {
    const time = this.state.time
    return (
      <div className='userdata-dmt'>
        <div>
          <label>白屏平均时间</label>
          <span>{time.white} ms</span>
        </div>
        <div>
          <label>loaded平均时间</label>
          <span>{time.loaded} ms</span>
        </div>
      </div>
    )
  }
}

export default OpenTime