import React, { lazy, Suspense } from 'react'
import { BrowserRouter as MyRouter, Navigate, Route, Routes } from 'react-router-dom'
// import Login from '@/pages/Login/Login.js'

// import Layout from '@/pages/Layout/Layout.js'
// import Message from '@/pages/Message/Message.js'
// import HomeList from '@/pages/SerchHome/SerchHome.js'
// import My from '@/pages/My/My.js'
// import HomePage from '@/pages/HomePage/HomePage.js'
// import Maps from '@/pages/Map/Map.js'
// import CityList from '@/pages/cityList/cityList.js'


const Login = lazy(() => import('@/pages/Login/Login.js'))
const Layout = lazy(() => import('@/pages/Layout/Layout.js'))
const Message = lazy(() => import('@/pages/Message/Message.js'))
const HomeList = lazy(() => import('@/pages/SerchHome/SerchHome.js'))
const My = lazy(() => import('@/pages/My/My.js'))

const HomePage = lazy(() => import('@/pages/HomePage/HomePage.js'))
const Maps = lazy(() => import('@/pages/Map/Map.js'))
const CityList = lazy(() => import('@/pages/cityList/cityList.js'))
const Rent = lazy(() => import('@/pages/Rent/Rent.js'))

export default function RouteList () {
  return (
    <div>
      <MyRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/rent' element={<RequireAuth><Rent></Rent></RequireAuth>}></Route>
            <Route path='/map' element={<Maps></Maps>}></Route>
            <Route path='/city' element={<CityList></CityList>}></Route>
            <Route path='/home' element={<Layout></Layout>}>
              <Route path='/home/message' element={<Message></Message>}></Route>
              <Route path='/home/serchHome' element={<HomeList></HomeList>}></Route>
              <Route path='/home/my' element={<RequireAuth><My></My></RequireAuth>}></Route>

              <Route path='/home/index' element={<HomePage></HomePage>}></Route>
              <Route path='/home' element={<Navigate to='/home/index'></Navigate>}></Route>
            </Route>
            <Route path='*' element={<Navigate to='/home'></Navigate>}></Route>
          </Routes>
        </Suspense>
      </MyRouter>
    </div>
  )
}

// 简单的路由鉴权
function RequireAuth ({ children }) {
  const authed = localStorage.getItem('token')

  return authed ? ( // 判断 localstorage 中登录状态是否为 true
    children
  ) : (
    <Navigate to="/login" replace /> // 跳转到登录
  )
}
