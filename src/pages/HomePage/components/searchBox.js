import { baseURL } from "@/api/request.js"
import { getToken } from "@/utils/storage.js"
import axios from "axios"
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
export default function SearchBox () {
  async function getCityId () {
    const res = await axios.get(`${baseURL}/area/info?name=${getToken()}`)
    localStorage.setItem('cityId', res.data.body.value)
  }

  useEffect(() => {
    getCityId()


  }, [])



  const navigate = useNavigate()
  return (
    <div className="searchBox">
      <div className="searchLeft">
        <div className="leftFirst" onClick={() => {
          navigate('/city')
        }}>
          <span className="city">
            {/* {getToken() && JSON.parse(getToken())} */}
            {getToken()}
          </span>
          <svg className="icon leftIcon" aria-hidden="true">
            <use xlinkHref="#icon-zhcc_xiangxiajiantou"></use>
          </svg>
        </div>
        <div className="leftSecond">
          <span>
            |
          </span>
          <svg className="icon leftIcon" aria-hidden="true">
            <use xlinkHref="#icon-fangdajing"></use>
          </svg>
          <input type="text" className="ipt" placeholder="请输入小区或地址" />

        </div>


      </div>
      <div className="searchRight" onClick={() => {
        navigate('/map')
      }}>
        <svg className="icon iconSize" aria-hidden="true">
          <use xlinkHref="#icon-ditu"></use>
        </svg>
      </div>
    </div>
  )
}
