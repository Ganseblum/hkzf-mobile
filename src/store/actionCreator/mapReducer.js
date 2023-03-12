// import store from "../store.js"


//reduxThunk
function getPoints () {
  var geolocation = new window.BMapGL.Geolocation()
  const aa = geolocation.getCurrentPosition(function (r) {
    return r
  })
  return (dispatch) => {
    dispatch({
      type: 'getPonit',
      payload: aa
    })
  }
}

//reduxPromise
// function getList () {
//   return axios({
//     url: "http://jsonplaceholder.typicode.com/posts",
//     method: 'GET',
//   }).then(res => {
//     return {
//       type: 'change-list',
//       payload: res.data
//     }
//   })
// }

//async
// async function getList () {
//   var list = await axios({
//     url: "http://jsonplaceholder.typicode.com/posts",
//     method: 'GET',
//   }).then(res => {
//     return {
//       type: 'change-list',
//       payload: res.data
//     }
//   })

//   return list
// }



export default getPoints