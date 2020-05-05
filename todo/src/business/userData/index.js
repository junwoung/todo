import React from 'react'
import './userData.css'
import DmtData from './dmt'
import PolylineData from './polyline'
import OpenTime from './openTime'

class UserData extends React.Component {
  render () {
    return (
      <div className='content-outer'>
        <div className='content-wrap'>
          <DmtData />
          <OpenTime />
          <PolylineData />
        </div>
      </div>
    )
  }
}

export default UserData