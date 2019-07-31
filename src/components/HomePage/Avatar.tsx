import React, { useEffect, useRef } from 'react'
import { useGesture } from 'react-use-gesture'

import { windowGlobal } from '/src/vars'

import styles from './Avatar.module.styl'

export function Avatar() {
  if (!windowGlobal) {
    return null
  }

  const avatarContainerRef  = useRef<HTMLDivElement>(null)
  const avatarRef           = useRef<HTMLDivElement>(null)
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

  const bind = useGesture({
    onScroll     : ({ delta }) => {
      setAvatarTransform(`${-delta[1]}px`)
    },
    onScrollStart: () => {
      setAvatarClass(styles.avatarFall)
    },
    onScrollEnd  : ({ delta, velocity }) => {
      if (delta[1] === 0) {
        console.log(velocity)

      }
      const transitionDurationMS = 2000

      setAvatarTransform()
      setAvatarTransition(`transform ${transitionDurationMS}ms`)

      const deltaY = delta[1]
      /*
       Float avatar if deltaY === 0 because on mobile this scroll handler
       sometimes gets called multiple times with the original deltaY and a
       deltaY that's equal to 0
       */
      if (Math.abs(deltaY) > 20 || deltaY === 0) {
        setAvatarClass(styles.avatarFloat)

        if (floatAnimTimeoutRef.current) {
          clearTimeout(floatAnimTimeoutRef.current)
        }

        floatAnimTimeoutRef.current = setTimeout(() => {
          setAvatarClass(styles.avatarStand)
          setAvatarTransition('unset')
        }, transitionDurationMS)
      } else {
        setAvatarClass(styles.avatarStand)
      }
    },
  }, { domTarget: windowGlobal })

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
      <div className={styles.transformWidthContainer}>
        <div ref={avatarContainerRef} className={styles.avatarWave}>
          <div ref={avatarRef} className={styles.avatar} />
        </div>
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
