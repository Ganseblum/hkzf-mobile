import React, { useEffect, useState } from 'react'

export default function My () {
  const [userInfo, setUserInfo] = useState()
  useEffect(() => {

    setUserInfo(JSON.parse(localStorage.getItem('uerInfo')))

  }, [])
  console.log(userInfo)
  return (
    <div>
      {
        userInfo && <div>
          名字：{userInfo.nickname}
        </div>
      }

    </div>
  )
}
