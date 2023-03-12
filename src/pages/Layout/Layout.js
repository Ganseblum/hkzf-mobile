import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import styles from './Layout.module.scss'
import TabBars from './components/tabBar.js'
import { getToken, setToken } from '@/utils/storage.js'

export default function Layout () {
  const [point, setPoint] = useState()
  const [cityName, setcityName] = useState()
  useEffect(() => {
    const citys = new window.BMapGL.LocalCity()
    citys.get((res) => {
      setPoint(res.center)
      setcityName(res.name)
      // 有就不在进行获取
      getToken() || setToken(res.name)
    })
  }, [])


  return (
    <div>
      <Outlet></Outlet>

      <div className={styles.root}>

        <TabBars></TabBars>
      </div>
    </div>
  )
}
