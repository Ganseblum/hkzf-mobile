import React from 'react'
import Swipers from './components/swiper.js'
import NavBar from './components/navBar.js'
import MoreGrid from './components/moreGrid.js'

import styles from './HomePage.module.scss'
import Information from './components/information.js'
import SearchBox from './components/searchBox.js'
export default function HomePage () {
  return (
    <div className={styles.root}>
      <SearchBox></SearchBox>
      <div className='swiper'>
        <Swipers></Swipers>
      </div>
      <NavBar></NavBar>
      <MoreGrid></MoreGrid>
      <Information></Information>

    </div>
  )
}
