/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { Grid } from 'antd-mobile'
import Nav1 from '@/assets/images/nav-1.png'
import Nav2 from '@/assets/images/nav-2.png'
import Nav3 from '@/assets/images/nav-3.png'
import Nav4 from '@/assets/images/nav-4.png'
import { useNavigate } from 'react-router-dom'

export default function NavBar () {
  const gridList = [{
    name: '整租',
    img: Nav1,
    link: '/home/serchHome'
  }, {
    name: "合租",
    img: Nav2,
    link: '/home/serchHome'

  }, {
    name: '地图找房',
    link: '/map',
    img: Nav3
  }, {
    name: '去出租',
    img: Nav4,
    link: '/rent',
  }]
  const navigate = useNavigate()
  const goLink = (link) => {
    navigate(`${link}`)
  }
  return (
    <div className='gridBox'>
      <Grid columns={4}>
        {gridList.map((item, index) => <Grid.Item key={index} onClick={() => {
          goLink(item.link)
        }}><img src={item.img}></img> {item.name} </Grid.Item>)}
      </Grid>
    </div>
  )
}
