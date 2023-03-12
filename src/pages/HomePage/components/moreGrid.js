import React, { useEffect, useState } from 'react'
import { Grid } from 'antd-mobile'
import { getGroups } from '@/api/https.js'

export default function MoreGrid () {

  const [groups, setGroups] = useState()

  useEffect(() => {
    getGroups().then((res) => {
      setGroups(res.body)
    })

  }, [])


  return (
    <div className='moreGrid'>
      <div className="moreTitle">
        <span className='title1'>租房小组</span>
        <span className='title2'>更多</span>
      </div>

      <Grid columns={2} >
        {groups && groups.map((item, index) => <Grid.Item key={index}>
          <div className='moreGrid_l'>
            <img src={`http://liufusong.top:8080${item.imgSrc}`} alt="" />
          </div>
          <div className='moreGrid_r'>

            <span>{item.title}</span>
            {item.desc}
          </div>

        </Grid.Item>)}
      </Grid>
    </div>
  )
}
