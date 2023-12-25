import { useState, useEffect } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { AddPrefix } from '@/common'
import Portal from '@/components/Portal/Portal'

export enum DrawerPlacement {
  top = 'top',
  bottom = 'bottom',
  left = 'left',
  right = 'right',
}

export interface DrawerProps {
  isOpen?: boolean
  placement?: DrawerPlacement
  animationDuration?: number
  onClose?: () => void
  children?: React.ReactNode
}

type InternalDrawerProps = AddPrefix<Omit<DrawerProps, 'children'>>

const hideMask = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const showMask = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const leftShowDrawer = keyframes`
  0% {
    left: -100%;
  }
  100% {
    left: 0%;
  }
`

const leftHideDrawer = keyframes`
  0% {
    left: 0%;
  }
  100% {
    left: -100%;
  }
`

const rightShowDrawer = keyframes`
  0% {
    right: -100%;
  }
  100% {
    right: 0%;
  }
`

const rightHideDrawer = keyframes`
  0% {
    right: 0%;
  }
  100% {
    right: -100%;
  }
`

const bottomShowDrawer = keyframes`
  0% {
    bottom: -100%;
  }
  100% {
    bottom: 0%;
  }
`

const bottomHideDrawer = keyframes`
  0% {
    bottom: 0%;
  }
  100% {
    bottom: -100%;
  }
`

const topShowDrawer = keyframes`
  0% {
    top: -100%;
  }
  100% {
    top: 0%;
  }
`

const topHideDrawer = keyframes`
  0% {
    top: 0%;
  }
  100% {
    top: -100%;
  }
`

const topStyle = css<InternalDrawerProps>`
  top: 0px;
  left: 0px;
  width: 100vw;
  animation: ${(props) => (props.$isOpen ? topShowDrawer : topHideDrawer)}
    ${(props) => props.$animationDuration}ms ease-in-out forwards;
`

const bottomStyle = css<InternalDrawerProps>`
  bottom: 0px;
  left: 0px;
  width: 100vw;
  animation: ${(props) => (props.$isOpen ? bottomShowDrawer : bottomHideDrawer)}
    ${(props) => props.$animationDuration}ms ease-in-out forwards;
`

const leftStyle = css<InternalDrawerProps>`
  top: 0px;
  left: 0px;
  height: 100vh;
  animation: ${(props) => (props.$isOpen ? leftShowDrawer : leftHideDrawer)}
    ${(props) => props.$animationDuration}ms ease-in-out forwards;
`

const rightStyle = css<InternalDrawerProps>`
  top: 0px;
  right: 0px;
  height: 100vh;
  animation: ${(props) => (props.$isOpen ? rightShowDrawer : rightHideDrawer)}
    ${(props) => props.$animationDuration}ms ease-in-out forwards;
`

const placementMap = {
  top: topStyle,
  right: rightStyle,
  bottom: bottomStyle,
  left: leftStyle,
}

const Mask = styled.div<InternalDrawerProps>`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background: #00000080;
  z-index: 2;
  animation: ${(props) => (props.$isOpen ? showMask : hideMask)}
    ${(props) => props.$animationDuration}ms ease-in-out forwards;
`

const DrawerWrapper = styled.div<InternalDrawerProps>`
  position: fixed;
  z-index: 3;
  background: #fff;
  ${(props) => placementMap[props.$placement || DrawerPlacement.left]}
`

const Drawer = ({
  children,
  isOpen = false,
  placement = DrawerPlacement.left,
  onClose,
  animationDuration = 200,
}: DrawerProps) => {
  const [removeDOM, setRemoveDOM] = useState(!isOpen)

  useEffect(() => {
    if (isOpen) {
      setRemoveDOM(false)
    } else {
      setTimeout(
        () => {
          setRemoveDOM(true)
        },
        Number(animationDuration) + 100,
      )
    }
  }, [animationDuration, isOpen])

  return (
    !removeDOM && (
      <Portal>
        <Mask $isOpen={isOpen} $animationDuration={animationDuration} onClick={onClose} />
        <DrawerWrapper
          $isOpen={isOpen}
          $placement={placement}
          $animationDuration={animationDuration}
        >
          {children}
        </DrawerWrapper>
      </Portal>
    )
  )
}

export default Drawer
