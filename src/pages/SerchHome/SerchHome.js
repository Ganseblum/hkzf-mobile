import NavBar from '@/components/NavBar/navBar.js'
import styles from './SerchHome.module.scss'
import SearchBox from '../HomePage/components/searchBox.js'
import FilterTitle from './FilterTitle/FilterTitle.js'
import { useEffect, useState, useRef } from 'react'
import FilterPicker from './FilterPicker/FilterPicker.js'
import axios from 'axios'
import { baseURL } from '@/api/request.js'
import FilterMore from './FilterMore/FilterMore.js'
import HouseItem from '@/components/HouseItem/houseItem.js'
import Sticky from '@/components/Sticky/sticky.js'
import { InfiniteScroll } from 'antd-mobile'
import { getToken } from '@/utils/storage.js'



export default function SerchHome () {
  const [isShow, setIsShow] = useState(false)
  const [data, setData] = useState([])
  const [houseList, setHouseList] = useState([])


  const [page, setPage] = useState({
    start: 1,
    end: 20
  })





  async function getHouseCondition (params) {
    const res = await axios.get(`${baseURL}/houses/condition?id=${params}`)
    setData(res.data.body)
  }
  const [hasList, setHasList] = useState(true)

  async function autoGetHouse () {
    return getHouseList(item)
  }


  async function getHouseList (params, type, id) {
    // 地区/地铁
    let area
    let subway
    // 价格
    let price
    // 方式
    let rentType
    let more
    if (params.length > 0) {
      if (params[0].value[0] === 'area') {
        if (params[0].value[2] === 'null') {
          if (params[0].value[1] === 'null') {
            area = ''
          } else {
            area = params[0].value[1]
          }
        } else {
          area = params[0].value[2]
        }
      }
      if (params[0].value[0] === 'subway') {
        if (params[0].value[2] === 'null') {
          if (params[0].value[1] === 'null') {
            subway = ''
          } else {
            subway = params[0].value[1]
          }
        } else {
          subway = params[0].value[2]
        }
      }
      rentType = params[1].value[0]
      price = params[2].value[0]
      more = params[3].value
    }
    const res = await axios.get(`${baseURL}/houses`, {
      params: {
        start: type ? 1 : page.start,
        end: type ? 20 : page.end,
        cityId: id ? id : localStorage.getItem('cityId'),
        area: area,
        subway: subway,
        rentType: rentType,
        price: price,
        more: more
      }
    })

    if (page.start === 1 || type) {
      setHouseList(res.data.body.list)
    } else {
      var newHouseList = houseList.concat(res.data.body.list)
      setHouseList(newHouseList)
    }

    setHasList(res.data.body.list.length > 0)
    let newPageList = {
      start: type ? 21 : page.start + 20,
      end: type ? 40 : page.end + 20
    }
    setPage(newPageList)
  }



  useEffect(() => {
    async function getid () {
      const res = await axios.get(`${baseURL}/area/info?name=${getToken()}`)
      let id = res.data.body.value
      getHouseCondition(id)
      getHouseList([], true, id)
    }

    getid()

  }, [])
  const [item, setItem] = useState([
    { type: 'area', value: '' },
    { type: 'subway', value: '' },
    { type: 'price', value: '' },
    { type: 'select', value: '' },
    { star: 1, end: 20 }
  ])
  const [selectItem, setSelectItem] = useState('')
  // 选择类型
  const changeItem = (e) => {
    setIsShow(true)
    setSelectItem(e)
  }
  // 确认和取消
  const cancle = () => {
    setIsShow(false)
  }

  const save = (e, type) => {
    if (e[0] === 'area' || e[0] === 'subway') {
      if (e[1] === 'null') {
        setSelectItem('')
      }
    }
    if (e[0] === 'null') {
      setSelectItem('')
    }
    setIsShow(false)
    const newItem = [...item]
    newItem.forEach(item => {
      if (item.type === type) {
        item.value = e
      }
    })
    setItem(newItem)

    getHouseList(item, true)


    window.scrollTo(0, 0)
  }

  function renderPicker () {

    if (selectItem === 'select' || selectItem === '') {
      return null
    }
    return <FilterPicker key={selectItem} selectItem={selectItem} cancle={() => {
      cancle()
    }} save={(e, type) => {
      save(e, type)
    }} data={data} item={item} ></FilterPicker>
    // item里面放的是默认值
  }

  const [more, setMore] = useState([])
  // 筛选组件中的清除和确认
  const onCancle = (e) => {
    setMore([])
    setSelectItem('')

    getHouseList(item, true)

    setIsShow(false)
  }

  const onSure = (e) => {
    setMore(e)
    if (e.length > 0) {
      setSelectItem('select')
    } else {
      setSelectItem('')
    }
    const newItem = [...item]
    newItem.forEach(item => {
      if (item.type === 'select') {
        item.value = e.join(",")
      }
    })
    setItem(newItem)
    getHouseList(item, true)
    setIsShow(false)
    window.scrollTo(0, 0)

  }


  function renderPickerMore () {


    // const { characteristic, floor, oriented, roomType } = data

    // const newData = [characteristic, floor, oriented, roomType]
    return <FilterMore data={data} more={more} onCancle={(e) => {
      onCancle(e)
    }} onSure={(e) => {
      onSure(e)
    }}> </FilterMore>
  }



  return (
    <div className={styles.root}>

      {selectItem !== 'select' && isShow && <div className='mark' onClick={() => {
        setIsShow(false)
      }}></div>}

      {
        isShow && selectItem === 'select' && <div className='markSelect' onClick={() => {
          setSelectItem('')
          setIsShow(false)
        }} ></div>
      }

      {isShow && selectItem === 'select' && renderPickerMore()}


      <NavBar center={<SearchBox></SearchBox>}   >
      </NavBar>




      <div className="filter">

        <Sticky>
          <FilterTitle changeItem={(e) => {
            changeItem(e)
          }} selectItem={selectItem}></FilterTitle>
        </Sticky>


        {isShow && renderPicker()}




        {/* <FilterPicker selectItem={selectItem} cancle={() => {
          cancle()
        }} save={() => {
          save()
        }} data={data} ></FilterPicker> */}

      </div>


      <div className='houseLsit'>

        {/* {houseList.length === 0 ? <DotLoading /> : ""} */}
        <HouseItem houseList={houseList}></HouseItem>


        <InfiniteScroll loadMore={autoGetHouse} hasMore={hasList} threshold={100} />
      </div>




    </div>
  )
}

