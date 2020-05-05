import React from 'react'
import Apis from '../apis';
import Utils from '../frame/utils/utils';
import Echarts from 'echarts'
import dayjs from 'dayjs'

class PolylineData extends React.Component {
  constructor () {
    super()
    this.state = {
      weeks: []
    }
  }
  componentDidMount () {
    this.getWeeks()
  }
  async getWeeks () {
    let res = await Apis.userData.weeks()
    Utils.dealRes(res, () => {
      let cur = Date.now(), step = 24 * 3600 * 1000
      let flag = 7
      let dates = Array.from({ length: 7 }).map(item => {
        let time = cur - flag * step
        flag--
        return dayjs(time).format('YYYY-MM-DD')
      })
      let data = dates.reduce((t, c) => {
        t[c] = res.data[c] || 0
        return t
      }, {})
      this.setState({
        weeks: data
      })
      this.drawPolyline()
    })
  }
  drawPolyline () {
    const ec = Echarts.init(document.getElementById('weeks-polyline'))
    const option = {
      title: { text: '一周日活数据' },
      tooltip: {},
      legend: {
        data: ['用户']
      },
      xAxis: {
        data: Object.keys(this.state.weeks)
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          type: 'line',
          data: Object.values(this.state.weeks)
        }
      ]
    }
    ec.setOption(option)
  }
  render () {
    return (
      <div id='weeks-polyline' className='weeks-polyline'>
        正在查询一周日活数据...
      </div>
    )
  }
}

export default PolylineData