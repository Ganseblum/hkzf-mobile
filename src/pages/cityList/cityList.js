import React, { useEffect, useState, useRef } from 'react'
import NavBar from '@/components/NavBar/navBar.js'
import styles from './cityList.module.scss'

import 'react-virtualized/styles.css'   //导入样式
import { List, AutoSizer } from 'react-virtualized' //导入list组件
import { getCityList, getHotCity } from '@/api/https.js'
import { formLsit } from '@/utils/formList.js'
import { getToken, setToken } from '@/utils/storage.js'
import { Toast } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { baseURL } from '@/api/request.js'


export default function CityList () {
  const navigate = useNavigate()
  const [cityList, setCityList] = useState()
  const [cityIndex, setCityIndex] = useState()
  const [activeIndex, setActiveIndex] = useState(0)
  const listRef = useRef()



  // 渲染右侧选项
  function CityUl () {


    return <div className='cityUl'>
      <ul>
        {
          cityIndex && cityIndex.map((item, index) => <li key={item} className={index === activeIndex ? 'activeItem' : ''} onClick={() => {
            changIndex(index)
          }}>{item}</li>)
        }
      </ul>
    </div>
  }
  // 改变右侧选项
  const changIndex = (index) => {
    setActiveIndex(index)
    listRef.current.scrollToRow(index)
    listRef.current.measureAllRows()
  }


  async function getCityId (city) {
    const res = await axios.get(`${baseURL}/area/info?name=${city}`)
    localStorage.setItem('cityId', res.data.body.value)
  }
  // 选择城市
  function setCity (city) {
    // 数据库的问题只有北上广深
    const cityList = ['北京', '上海', '广州', '深圳']
    if (cityList.indexOf(city) > -1) {
      setToken(city)
      getCityId(city)
      navigate(-1)
    } else {
      Toast.show({
        content: '暂无该城市的相关数据',
      })

    }
  }

  // 滚动效果改变右侧
  const onRowsRendered = (e) => {
    // startIndex
    if (e.startIndex !== activeIndex) {
      setActiveIndex(e.startIndex)
    }
  }


  useEffect(() => {
    getCityList({ level: 1 }).then(res => {
      const { cityNameList, cityIndex } = formLsit(res.body)
      getHotCity().then(res => {
        cityIndex.unshift('hot')
        cityIndex.unshift('#')
        cityNameList['hot'] = res.body
        cityNameList['#'] = [{ label: getToken() }]
        setCityIndex(cityIndex)
        setCityList(cityNameList)

      })
    })

    return () => {
      Toast.clear()
    }
  }, [])

  // 获取自动高度
  const rowHeight = ({ index }) => {
    return 25 + cityList[cityIndex[index]].length * 50
  }

  // 选人城市的
  const rowRenderer = ({
    key,         // 每一行的唯一标识
    index,       // 索引号
    isScrolling,
    style,        // 重点属性：一定要给每一个行数添加该样式
  }) => {



    const letter = cityIndex[index]
    return (
      <div key={key} style={style} className='listItem'>
        <div className="cityIndex">{formateLabel(letter)}</div>
        {
          cityList[letter] && cityList[letter].map((item, index) => <div className='cityName' key={index} onClick={() => {
            setCity(item.label)
          }}>{item.label}</div>)
        }
      </div>
    )
  }
  if (!cityList) {
    Toast.show({
      content: '加载中....',
      icon: 'loading',
      maskClickable: false,
      duration: 0
    })
  } else {
    Toast.clear()
  }

  return (
    <div className={styles.root}>
      <NavBar center='城市列表'></NavBar>
      {cityList && <AutoSizer>
        {({ height, width }) => (
          <List
            ref={listRef}
            height={height}
            width={width}
            rowCount={cityIndex.length}
            rowHeight={
              rowHeight
            }
            rowRenderer={rowRenderer}
            onRowsRendered={
              (e) => {
                onRowsRendered(e)
              }
            }
            scrollToAlignment='start'
          />
        )}
      </AutoSizer>
      }

      <CityUl></CityUl>
    </div>
  )
}


function formateLabel (lable) {
  switch (lable) {
    case '#':
      return '当前城市'
    case 'hot':
      return '热门城市'
    default:
      return lable
  }
}
