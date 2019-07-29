import React from 'react'

import styles from './index.module.styl'

import { Avatar } from '/src/components/HomePage/Avatar'

export default function Index() {
  return (
    <>
      <div className={styles.container}>
        <h1>Hello!</h1>
        <p>My name is Calum and this is my personal website.</p>
      </div>

      <Avatar />
    </>
  )
}
