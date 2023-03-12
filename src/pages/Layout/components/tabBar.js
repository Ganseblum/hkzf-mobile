import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import styles from '../Layout.module.scss'
import { TabBar } from 'antd-mobile'
import {
  AppOutline,
  MessageOutline,
  SearchOutline,
  UserOutline,
} from 'antd-mobile-icons'



export default function TabBars () {
  // tabbar选择跳转
  const [pathname, setPathname] = useState(useLocation().pathname)
  const gloablPathName = useLocation().pathname

  useEffect(() => {
    setPathname(gloablPathName)
  }, [gloablPathName])

  const navigate = useNavigate()
  const setRouteActive = (value) => {
    navigate(value)
    setPathname(value)
  }
  const tabs = [
    {
      key: '/home/index',
      title: '首页',
      icon: <AppOutline />,
    },
    {
      key: '/home/serchHome',
      title: '找房',
      icon: <SearchOutline />,
    },
    {
      key: '/home/message',
      title: '资讯',
      icon: <MessageOutline />,
    },
    {
      key: '/home/my',
      title: '我的',
      icon: <UserOutline />,
    },
  ]
  return (
    <div>
      <div className={styles.root}>
        <TabBar className="tabBarBox" defaultActiveKey='/home/index'
          activeKey={pathname}
          onChange={value => setRouteActive(value)}
        >
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title}

            />
          ))}
        </TabBar>
      </div>
    </div>
  )
}
