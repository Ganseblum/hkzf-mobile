/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import styles from './map.module.scss'
// import { Map, Marker, NavigationControl, InfoWindow } from 'react-bmapgl'
// import { Map } from 'react-bmapgl'
import NavBar from '@/components/NavBar/navBar.js'

import { getToken } from '@/utils/storage.js'
import axios from 'axios'
import classNames from 'classnames'
import { Toast } from 'antd-mobile'
import { baseURL } from '@/api/request.js'
import { useNavigate } from 'react-router-dom'
// import { loading } from 'antd-mobile-icons'

export default function Maps () {
  const [point, setPoint] = useState()
  console.log(point)
  const [id, setId] = useState()
  const [houseList, setHouseList] = useState()
  const [show, setShow] = useState(false)

  const navigate = useNavigate()


  // 获取城市信息id
  const getId = async (city) => {
    const res = await axios.get(`http://liufusong.top:8080/area/info?name=${city}`)
    setId(res.data.body.value)
  }


  useEffect(() => {
    var map = new BMapGL.Map("allmap")
    map.addEventListener('movestart', () => {
      setShow(false)
    })
    const city = getToken()
    getId(city)

    Toast.show({
      content: '加载中....',
      icon: 'loading',
      maskClickable: false,
      duration: 0
    })

    // 获取数据
    const rederOverlays = async (id) => {
      const res = await axios.get(`http://liufusong.top:8080/area/map?id=${id}`)
      // console.log(res)
      const list = res.data.body
      const { nextZoom, type } = getTypeAndZoom()
      list.forEach(item => {
        createOverlays(item, nextZoom, type)
      })
    }



    // 计算覆盖物类型和下一缩放级别
    const getTypeAndZoom = () => {
      let nextZoom
      let type
      const zoom = map.getZoom()
      if (zoom >= 10 && zoom < 12) {
        nextZoom = 13
        type = 'circle'
      } else if (zoom >= 12 && zoom < 14) {
        nextZoom = 15
        type = 'circle'
      } else if (zoom >= 14 && zoom < 16) {
        type = 'rect'
      }
      return { nextZoom, type }
    }
    // 覆盖物
    const createOverlays = (data, zoom, type) => {
      Toast.clear()
      const {
        coord: { longitude, latitude },
        label: areaName,
        count,
        value } = data

      var areaPoint = new BMapGL.Point(longitude, latitude)

      if (type === 'circle') {
        createCircle(areaPoint, areaName, count, value, zoom)
      } else {
        createRect(areaPoint, areaName, count, value)
      }
    }
    // 创建区,镇覆盖物
    const createCircle = (point, name, count, id, zoom) => {
      // 创建label
      const opts = {
        position: point,
        offset: new BMapGL.Size(30, -30)
      }
      // 设置setcontent后，第一个参数就没用了
      const label = new BMapGL.Label('', opts)
      label.id = id
      // 设置覆盖物内容
      label.setContent(`<div class="${styles.bubbleCircle}">
        <p class="${styles.mapHousTitle}">${name}</p>
        <p>${count} 套</p>
        </div>`)
      label.addEventListener('click', () => {
        Toast.show({
          content: '加载中....',
          icon: 'loading',
          maskClickable: false,
          duration: 0
        })
        // 获取下一级的房源信息
        rederOverlays(id)
        console.log('点击了房源信息')
        map.centerAndZoom(point, zoom)
        setTimeout(() => {
          map.clearOverlays()
        }, 0)
      })
      map.addOverlay(label)

    }

    // 获取小区的租房信息
    const getRectHoseInfo = async (ids) => {
      Toast.show({
        content: '加载中....',
        icon: 'loading',
        maskClickable: false,
        duration: 0
      })

      const res = await axios.get(`${baseURL}/houses?cityId=${ids}`)
      setHouseList(res.data.body.list)
      setShow(true)
      Toast.clear()
    }

    // 创建小区覆盖物
    const createRect = (point, name, count, id, zoom) => {

      // 创建label
      const opts = {
        position: point,
        offset: new BMapGL.Size(15, -5)
      }
      // 设置setcontent后，第一个参数就没用了
      const label = new BMapGL.Label('', opts)
      label.id = id
      // 设置覆盖物内容
      label.setContent(`<div class="${styles.bubbleRect}">
            <p class="${styles.mapRectTitle}">${name}</p>
            <p>${count}套</p>
            </div>`)
      label.addEventListener('click', (e) => {
        setShow(false)

        // const target = e.changedTouches[0]
        // map.panBy(
        //   window.innerWidth / - target.clientX,
        //   (window.innerHeight - 330) / 2 - target.clientY
        // )


        // 获取下一级的房源信息
        getRectHoseInfo(id)




        // rederOverlays(id)
        // console.log('点击了房源信息')
        // map.centerAndZoom(point, zoom)
        // setTimeout(() => {
        //   map.clearOverlays()
        // }, 0)
      })
      map.addOverlay(label)

    }

    var myGeo = new BMapGL.Geocoder()
    // 初始话地图
    myGeo.getPoint(city, function (point) {
      if (point) {
        setPoint(point)
        var points = new BMapGL.Point(point.lng, point.lat)
        map.centerAndZoom(points, 11)
        // map.addOverlay(new BMapGL.Marker(point))
        // 添加控件标尺和缩放
        map.addControl(new BMapGL.NavigationControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT }))
        map.addControl(new BMapGL.ScaleControl())
        rederOverlays(id)

        // // 创建label
        // const opts = {
        //   position: point,
        //   offset: new BMapGL.Size(30, -30)
        // }
        // // 设置setcontent后，第一个参数就没用了
        // const label = new BMapGL.Label('', opts)

        // // 设置覆盖物内容
        // label.setContent(`<div class="${styles.bubble}">
        // <p class="${styles.name}">dddddddd</p>
        // <p>9999 套</p>
        // </div>`)
        // label.addEventListener('click', () => {
        //   console.log('点击了房源信息')
        // })
        // map.addOverlay(label)
      }
    }, city)
    return () => {
      Toast.clear()
    }

  },
    [id])




  // {point && <Map zoom="11" style={{
  //   height: '100%'
  // }}
  //   center={new BMapGL.Point(point.lng, point.lat)}>
  //   {/* 红点 */}
  //   {/* <Marker position={point} /> */}
  // </Map>}

  return (
    <>
      <div className={styles.mapContainer} >
        <NavBar center='地图找房'></NavBar>
        <div id="allmap"></div>

        {/* <div className='hoseList'> */}
        <div className={classNames(['hoseList', show ? 'show' : 'hide'])}>

          <div className="listTop">
            <span className='listTitle'>房屋列表</span>
            <span className='listMore' onClick={() => {
              navigate('/home/serchHome')
            }}>更多房源</span>
          </div>
          
          <div className="listBottom">
            {houseList && houseList.map((item, index) => <div className="listItem" key={index}>
              <div className="itemLeft">
                <img src={baseURL + `${item.houseImg}`} alt="" />
              </div>
              <div className="itemRight">
                <h3>{item.title}</h3>
                <span>{item.desc}</span>
                <div className="tagsBox">
                  {
                    item.tags && item.tags.map((items, indexs) => <div className="tags" key={indexs}>{items}</div>
                    )
                  }
                </div>
                <div className="price">
                  <span>{item.price}</span>元/月
                </div>
              </div>
            </div>)}
          </div>
        </div>

      </div>
    </>

  )
}


// 获取城市
    // const citys = new BMapGL.LocalCity()
    // citys.get((res) => {
    //   setPoint(res.center)
    //   setcityName(res.name)
    // })

