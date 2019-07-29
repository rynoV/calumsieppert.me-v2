import React, { EffectCallback, useEffect, useRef, useState } from 'react'

import styles from '/src/pages/index.module.styl'

import { useScroll } from 'react-use-gesture'

export default function Index() {
  const [scrolling, setScrolling] = useState<boolean>(false)

  const avatarContainerRef = useRef<HTMLDivElement>(null)

  function setTranslateX() {
    if (avatarContainerRef.current) {
      avatarContainerRef.current.style.transform = getCurrentTranslateX()
    }
  }

  const bind = useScroll(
    ({ scrolling: newScrolling }) => {
      setTranslateX()

      if (newScrolling !== scrolling) {
        setScrolling(newScrolling)
      }
    },
    { domTarget: window },
  ) as EffectCallback

  useEffect(bind, [bind])

  useEffect(() => {
    setTranslateX()
  }, [])

  return (
    <>
      <div className={styles.container}>
        <h1>Hello!</h1>
        <p>My name is Calum and this is my personal website.</p>
      </div>

      <div className={styles.avatarOverlay}>
        <div className={styles.avatarContainer} ref={avatarContainerRef}>
          <div
            className={`${styles.avatar} ${scrolling ? styles.animate : null}`}
          />
        </div>
      </div>
    </>
  )
}

function getCurrentTranslateX() {
  const b    = Math.PI / window.innerHeight / 2
  const cosX = Math.cos(window.pageYOffset * b)

  return `translateX(${Math.abs(cosX) * 100}%)`
}
