import { useRef, useEffect } from 'react'
import styles from './sticky.module.scss'

export default function Sticky (props) {
  var navBar = useRef()
  var box = useRef()
  // console.log(navBar.current)

  function handleScroll () {
    // console.log(navBar.current)
    const navBatEl = navBar.current
    const boxEl = box.current
    let { top } = boxEl.getBoundingClientRect()
    if (top < 0 && top !== 0) {
      // 吸顶
      navBatEl.classList.add(styles.fixed)
      boxEl.style.height = '50px'
    } else if (top > 0 && top !== 0) {
      navBatEl.classList.remove(styles.fixed)
      boxEl.style.height = '0px'
    }
  }
  useEffect(() => {

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)

    }
  }, [])

  return (
    <>
      <div ref={box}></div>
      <div ref={navBar}>
        {
          props.children
        }
      </div>
    </>

  )
}
