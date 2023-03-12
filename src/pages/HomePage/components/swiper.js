import { Swiper } from 'antd-mobile'
import React, { useState, useEffect } from 'react'
import { geiSwiperList } from '@/api/https.js'
import { baseURL } from '@/api/request.js'
export default function Swipers () {
  const [swiperList, setSwiperList] = useState()
  useEffect(() => {
    geiSwiperList().then(res => {
      setSwiperList(res.body)
    })
  }, [])
  const items = swiperList && swiperList.map((item, index) => (
    < Swiper.Item key={index} >
      <img src={baseURL + `${item.imgSrc}`} alt="" />
    </ Swiper.Item >
  ))
  return (
    <Swiper autoplay loop={true}>{items}</Swiper>

  )
}
