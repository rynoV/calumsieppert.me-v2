import React from 'react'

import DownArrowSVG from '/src/assets/arrow-down.svg'
import projectDisplayPNG from '/src/assets/hilderman-project-display.png'

import styles from './index.module.styl'

import { Avatar } from '/src/components/HomePage/Avatar'
import { SEO } from '/src/components/common/SEO'

export default function Index() {
  return (
    <>
      <SEO />
      <main className={styles.homePage}>
        <div className={styles.hero}>
          <div className={styles.hero__content}>
            <h1>Hello!</h1>
            <p>My name is Calum and this is my personal website.</p>
          </div>
          <a className={styles.hero__scrollLink} href='#first-project'>
            <DownArrowSVG />
            <p>Scroll for projects</p>
          </a>
        </div>

        <div className={styles.project} id='first-project'>
          <div className={styles.project__description}>
            <h2>Hilderman Photo</h2>
            <p>This is an eccommerce/portfolio site for photography.</p>
            <a href='https://hilderman-photo.netlify.com/'>Learn more</a>
          </div>
          <img
            src={projectDisplayPNG}
            alt='Hilderman Photo website at laptop, tablet, and phone device sizes'
          />
        </div>

        <Avatar />
      </main>
    </>
  )
}
