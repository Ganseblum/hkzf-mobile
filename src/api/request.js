import axios from 'axios'     //引入
// import { getToken } from 'utils/storage.js'
export const baseURL = 'http://liufusong.top:8080'
let config = {
  baseURL: baseURL,
  timeout: 30000       //设置最大请求时间
}
const _axios = axios.create(config)
// const token = getToken()




//封装post,get方法
const http = {
  get (url = '', params = {}) {
    return new Promise((resolve, reject) => {
      _axios({
        url,
        params,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        method: 'GET'
      }).then(res => {
        resolve(res.data)
        return res
      }).catch(error => {
        reject(error)
      })
    })
  },
  post (url = '', params = {}) {
    return new Promise((resolve, reject) => {
      _axios({
        url,
        data: params,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        method: 'POST'
      }).then(res => {
        resolve(res.data)
        return res
      }).catch(error => {
        reject(error)
      })
    })
  }
}


export default http
