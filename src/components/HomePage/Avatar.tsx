import React, { EffectCallback, useEffect, useRef } from 'react'
import { useScroll } from 'react-use-gesture'

import { windowGlobal } from '/src/vars'

import styles from './Avatar.module.styl'

export function Avatar() {
  if (!windowGlobal) {
    return null
  }

  const avatarContainerRef  = useRef<HTMLDivElement>(null)
  const floatAnimTimeoutRef = useRef<NodeJS.Timeout>()

  function setAvatarClass(className: string) {
    if (avatarContainerRef.current) {
      avatarContainerRef.current.className = className
    }
  }

  function setAvatarTransform(translateYAmount: string = '0') {
    if (avatarContainerRef.current) {
      avatarContainerRef.current.style.transform
        = `translate(${getCurrentTranslateXAmount()}, ${translateYAmount}`
    }
  }

  function setAvatarTransition(transition: string) {
    if (avatarContainerRef.current) {
      avatarContainerRef.current.style.transition = transition
    }
  }

  const bind = useScroll(
    ({ delta, last, first }) => {
      setAvatarTransform(`${-delta[1]}px`)

      if (last) {
        const transitionDurationMS = 2000

        setAvatarTransform()
        setAvatarTransition(`transform ${transitionDurationMS}ms`)
        setAvatarClass(styles.avatarFloat)

        floatAnimTimeoutRef.current = setTimeout(() => {
          setAvatarClass(styles.avatarStand)
        }, transitionDurationMS)
      }

      if (first) {
        setAvatarTransition('unset')
        setAvatarClass(styles.avatarFall)
      }
    },
    { domTarget: windowGlobal },
  ) as EffectCallback

  useEffect(bind, [bind])

  useEffect(() => {
    setAvatarTransform()

    return () => {
      if (floatAnimTimeoutRef.current) {
        clearTimeout(floatAnimTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className={styles.avatarOverlay}>
      <div
        ref={avatarContainerRef}
        className={styles.avatarWave}
      >
        <div className={styles.avatar} />
      </div>
    </div>
  )
}

function getCurrentTranslateXAmount() {
  if (!windowGlobal) {
    return null
  }

  const b    = Math.PI / windowGlobal.innerHeight / 2
  const cosX = Math.cos(windowGlobal.pageYOffset * b)

  return `${Math.abs(cosX) * 100}%`
}
