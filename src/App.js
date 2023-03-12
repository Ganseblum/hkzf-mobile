import React from 'react'
import MRoute from '@/router/RouteList.js'
import styles from './App.module.scss'
export default function App () {
  return (
    <div className={styles.root}>
      <MRoute></MRoute>
    </div>
  )
}
