import { CascadePicker } from 'antd-mobile'
export default function FilterPicker (props) {

  const { selectItem, save, cancle, data, item } = props
  let newData
  let value
  if (selectItem === 'area') {
    newData = [data.area, data.subway]
    value = item[0].value
  } else if (selectItem === 'subway') {
    newData = data.rentType
    value = item[1].value
  } else if (selectItem === 'price') {
    newData = data.price
    value = item[2].value
  }
  // console.log(data.area.children)


  return (
    <div className="filterPickerBox">
      <CascadePicker
        options={newData}
        // options={data.area.children}
        visible={true}
        onClose={() => {
          cancle()
        }}
        value={value}
        onConfirm={(val, extend) => {
          save(val, selectItem)
          // console.log('onConfirm', val, extend.items)
        }}
      />
      {/* <div className="btnBox">
        <div className="cancle" onClick={() => {
          cancle()
        }}>取消</div>
        <div className="sure" onClick={() => {
          save()
        }}>确认</div>
      </div> */}
    </div>

  )
}
