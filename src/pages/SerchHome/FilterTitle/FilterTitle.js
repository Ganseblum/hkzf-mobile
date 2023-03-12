import classNames from "classnames"
export default function FilterTitle (props) {
  const typeList = [
    { type: 'area', name: '区域' },
    { type: 'subway', name: '方式' },
    { type: 'price', name: '租金' },
    { type: 'select', name: '筛选' },
  ]
  const typeFun = () => {
    return typeList.map((item) => <div className={classNames(['item', selectItem === `${item.type}` ? 'acticeItem' : ''])} onClick={() => {
      changeItem(`${item.type}`)
    }} key={item.name}>
      {item.name}
      <svg className="icon iconStyle" aria-hidden="true">
        <use xlinkHref="#icon-zhcc_xiangxiajiantou"></use>
      </svg>
    </div>)
  }


  const { changeItem, selectItem } = props
  return (
    <>
      <div className="filterTitleBox">

        {/* <div className={classNames(['item', selectItem === 'aera' ? 'acticeItem' : ''])} onClick={() => {
  changeItem('aera')
}}>
  区域
  <svg className="icon iconStyle" aria-hidden="true">
    <use xlinkHref="#icon-zhcc_xiangxiajiantou"></use>
  </svg>
</div> */}


        {typeFun()}



      </div>
    </>


  )
}
