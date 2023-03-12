import { Toast } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import styles from './navBar.module.scss'
export default function NavBar (props) {
  const navigate = useNavigate()
  const back = () => {
    navigate(-1)
    Toast.clear()
  }

  return (
    <div className={styles.root}>
      <div className='box'>
        <div className="left" onClick={
          () => {
            back()
          }
        } >
          <svg className="icon iconStyle " aria-hidden="true" >
            <use xlinkHref="#icon-zuojiantou" ></use>
          </svg>
        </div>
        <div className="center">
          {props.center}
        </div>
        <div className="right">{
          props.right
        }</div>
      </div>
    </div >
  )
}
