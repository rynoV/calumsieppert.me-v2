import React, { EffectCallback, useEffect, useRef, useState } from 'react'
import { useScroll } from 'react-use-gesture'

import { windowGlobal } from '/src/vars'

import styles from './Avatar.module.styl'

export function Avatar() {
  if (!windowGlobal) {
    return null
  }

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
    { domTarget: windowGlobal },
  ) as EffectCallback

  useEffect(bind, [bind])

  useEffect(() => {
    setTranslateX()
  }, [])

  return (
    <div className={styles.avatarOverlay}>
      <div className={styles.avatarContainer} ref={avatarContainerRef}>
        <div
          className={`${styles.avatar} ${scrolling ? styles.animate : null}`}
        />
      </div>
    </div>
  )
}

function getCurrentTranslateX() {
  if (!windowGlobal) {
    return null
  }

  const b    = Math.PI / windowGlobal.innerHeight / 2
  const cosX = Math.cos(windowGlobal.pageYOffset * b)

  return `translateX(${Math.abs(cosX) * 100}%)`
}
