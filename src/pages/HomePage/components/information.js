/* eslint-disable jsx-a11y/alt-text */
import { getInformation } from '@/api/https.js'
import React, { useEffect, useState } from 'react'
import { baseURL } from '@/api/request.js'
export default function Information () {
  const [infoList, setInfoList] = useState([])
  useEffect(() => {
    getInformation().then(res => {
      setInfoList(res.body)
    })
  }, [])

  return (
    <div className='information'>
      <div className="container">
        <div className="title">最新资讯</div>
        {
        infoList.map((item, index) => <div key={index}>
            <div className="infoItem" >
              <div className="itemLeft">
                <img src={baseURL + `${item.imgSrc}`} />
              </div>

              <div className="itemRight">
                <div className="rightTop">
                  {item.title}
                </div>
                <div className="rightBottom">
                  <span>{item.from}</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          </div>)
        }
      </div>
    </div>
  )
}
