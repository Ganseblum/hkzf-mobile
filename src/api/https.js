import https from './request.js'


// 获取首页轮播
export const geiSwiperList = function (params) {
  return https.get('/home/swiper', params)
}

// 获取租房小组
export const getGroups = function (params) {
  return https.get('/home/groups?area=AREA|88cff55c-aaa4-e2e0', params)
}

// 获取最新资讯
export const getInformation = function (params) {
  return https.get('/home/news?area=AREA|88cff55c-aaa4-e2e0', params)
}


// 获取当前城市的信息
export const getCityInfo = function (params) {
  return https.get(`/area/info?name=${params}`)
}

//获取城市列表
export const getCityList = function (params) {
  return https.get('/area/city', params)
}

//获取城市列表
export const getHotCity = function (params) {
  return https.get('/area/hot', params)
}
