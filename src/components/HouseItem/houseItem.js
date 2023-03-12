import { baseURL } from '@/api/request.js'

export default function houseItem (props) {
  const { houseList } = props
  // console.log(houseList)
  return (

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
  )
}
