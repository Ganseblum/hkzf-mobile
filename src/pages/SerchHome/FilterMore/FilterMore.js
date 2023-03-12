import classNames from "classnames"
import { useState } from 'react'
export default function FilterMore (props) {
  const { characteristic, floor, roomType } = props.data
  const { onCancle, more, onSure } = props
  const [moreData, setMoreData] = useState(more)
  var newData = [...moreData]
  const addData = (value) => {

    if (newData.indexOf(value) > -1) {
      const index = newData.indexOf(value)
      newData.splice(index, 1)
      setMoreData(newData)
    } else {
      newData.push(value)
      setMoreData(newData)

    }
  }

  return (
    <div className="filterMoreBox">
      <div className="filterMore">
        <div className="item" >
          <div className="itemTitle">户型</div>
          <div className="itemInfoBox">
            {
              roomType && roomType.map((item, index) =>
                <div className={classNames(['itemInfo', moreData.indexOf(item.value) > -1 ? 'activeItem' : ""])} key={index} onClick={() => {
                  addData(item.value)
                }} >{item.label}</div>)
            }
          </div>
        </div>

        <div className="item" >
          <div className="itemTitle">楼层</div>
          <div className="itemInfoBox">

            {
              floor && floor.map((item, index) =>
                <div className={classNames(['itemInfo', moreData.indexOf(item.value) > -1 ? 'activeItem' : ""])} key={index} onClick={() => {
                  addData(item.value)
                }} >{item.label}</div>)
            }
          </div>
        </div>


        <div className="item" >
          <div className="itemTitle">房屋亮点</div>
          <div className="itemInfoBox">

            {
              characteristic && characteristic.map((item, index) =>
                <div className={classNames(['itemInfo', moreData.indexOf(item.value) > -1 ? 'activeItem' : ""])} key={index} onClick={() => {
                  addData(item.value)
                }} >{item.label}</div>)
            }
          </div>
        </div>



        <div className="btn">
          <div className="cancle" onClick={() => {
            onCancle(moreData)
          }}>清除</div>
          <div className="sure" onClick={() => {
            onSure(moreData)
          }}>确认</div>
        </div>


      </div>
    </div>
  )
}
