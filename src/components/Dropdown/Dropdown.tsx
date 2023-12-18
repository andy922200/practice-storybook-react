import { useCallback, useEffect, useRef, useState, HTMLAttributes } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { AddPrefix } from '@/common'
import Portal from '@/components/Portal/Portal'
import { findAttributeInEvent } from '@/utils'

export enum DropdownPlacement {
  top = 'top',
  topLeft = 'top-left',
  topRight = 'top-right',
  bottom = 'bottom',
  bottomLeft = 'bottom-left',
  bottomRight = 'bottom-right',
  left = 'left',
  leftTop = 'left-top',
  leftBottom = 'left-bottom',
  right = 'right',
  rightTop = 'right-top',
  rightBottom = 'right-bottom',
}

export interface DropdownProps {
  isOpen?: boolean
  isDisabled?: boolean
  children?: React.ReactNode
  overlay?: React.ReactNode
  placement?: DropdownPlacement
  onClose?: () => void
}

type InternalDropdownProps = AddPrefix<Omit<DropdownProps, 'children'>> & {
  $position: {
    top: number
    left: number
  }
  $childrenSize: {
    width: number
    height: number
  }
  $gap: number
}

const topStyle = css<InternalDropdownProps>`
  transform: translate(
    calc(${(props) => props.$childrenSize.width / 2}px - 50%),
    calc(-100% - ${(props) => props.$gap}px)
  );
`

const topLeftStyle = css<InternalDropdownProps>`
  transform: translate(0px, calc(-100% - ${(props) => props.$gap}px));
`

const topRightStyle = css<InternalDropdownProps>`
  transform: translate(
    calc(-100% + ${(props) => props.$childrenSize.width}px),
    calc(-100% - ${(props) => props.$gap}px)
  );
`

const bottomStyle = css<InternalDropdownProps>`
  transform: translate(
    calc(${(props) => props.$childrenSize.width / 2}px - 50%),
    ${(props) => props.$childrenSize.height + props.$gap}px
  );
`

const bottomLeftStyle = css<InternalDropdownProps>`
  transform: translate(0px, ${(props) => props.$childrenSize.height + props.$gap}px);
`

const bottomRightStyle = css<InternalDropdownProps>`
  transform: translate(
    calc(-100% + ${(props) => props.$childrenSize.width}px),
    ${(props) => props.$childrenSize.height + props.$gap}px
  );
`

const rightTopStyle = css<InternalDropdownProps>`
  transform: translate(${(props) => props.$childrenSize.width + props.$gap}px, 0px);
`

const rightBottomStyle = css<InternalDropdownProps>`
  transform: translate(
    ${(props) => props.$childrenSize.width + props.$gap}px,
    calc(-100% + ${(props) => props.$childrenSize.height}px)
  );
`

const leftBottomStyle = css<InternalDropdownProps>`
  transform: translate(
    calc(-100% - ${(props) => props.$gap}px),
    calc(-100% + ${(props) => props.$childrenSize.height}px)
  );
`

const leftTopStyle = css<InternalDropdownProps>`
  transform: translate(calc(-100% - ${(props) => props.$gap}px), 0px);
`

const leftStyle = css<InternalDropdownProps>`
  transform: translate(
    calc(-100% - ${(props) => props.$gap}px),
    calc(-50% + ${(props) => props.$childrenSize.height / 2}px)
  );
`

const rightStyle = css<InternalDropdownProps>`
  transform: translate(
    ${(props) => props.$childrenSize.width + props.$gap}px,
    calc(-50% + ${(props) => props.$childrenSize.height / 2}px)
  );
`

const placementStyleMap = {
  top: topStyle,
  'top-left': topLeftStyle,
  'top-right': topRightStyle,
  'bottom-left': bottomLeftStyle,
  'bottom-right': bottomRightStyle,
  bottom: bottomStyle,
  'right-top': rightTopStyle,
  'left-top': leftTopStyle,
  'right-bottom': rightBottomStyle,
  'left-bottom': leftBottomStyle,
  left: leftStyle,
  right: rightStyle,
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`

const OverlayWrapper = styled.div<InternalDropdownProps>`
  position: absolute;
  z-index: 999;
  top: ${(props) => props.$position.top}px;
  left: ${(props) => props.$position.left}px;
  background: #fff;
  border-radius: 4px;
  box-shadow:
    0 3px 6px -4px rgb(0 0 0 / 12%),
    0 6px 16px 0 rgb(0 0 0 / 8%),
    0 9px 28px 8px rgb(0 0 0 / 5%);
  animation: ${(props) => (props.$isOpen ? fadeIn : fadeOut)} 0.3s ease-in-out forwards;
  ${(props) => placementStyleMap[props.$placement || DropdownPlacement.top]}
`

const Dropdown = ({
  children,
  isDisabled = false,
  placement = DropdownPlacement.bottom,
  overlay,
  isOpen,
  onClick,
  onClose,
}: DropdownProps & HTMLAttributes<HTMLDivElement>) => {
  const childrenRef = useRef<HTMLDivElement>(null)
  const [childrenSize, setChildrenSize] = useState({
    width: 0,
    height: 0,
  })
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
  })

  const handleOnResize = () => {
    setChildrenSize({
      width: childrenRef?.current?.offsetWidth || 0,
      height: childrenRef?.current?.offsetHeight || 0,
    })
    setPosition({
      top: childrenRef?.current?.getBoundingClientRect().top || 0,
      left: childrenRef?.current?.getBoundingClientRect().left || 0,
    })
  }

  const handleOnClick = useCallback(
    (event: Event) => {
      const dropdownId = findAttributeInEvent(event, 'data-dropdown-id')
      if (!dropdownId && onClose) {
        onClose()
      }
    },
    [onClose],
  )

  useEffect(() => {
    document.addEventListener('click', handleOnClick)
    return () => {
      document.removeEventListener('click', handleOnClick)
    }
  }, [handleOnClick])

  useEffect(() => {
    handleOnResize()
    window.addEventListener('resize', handleOnResize)
    return () => {
      window.removeEventListener('resize', handleOnResize)
    }
  }, [])

  return (
    <>
      <span
        role="presentation"
        ref={childrenRef}
        data-dropdown-id="dropdown"
        onClick={isDisabled ? undefined : onClick}
      >
        {children}
      </span>
      <Portal>
        <OverlayWrapper
          data-dropdown-id="dropdown"
          $isOpen={isOpen}
          $position={position}
          $placement={placement}
          $childrenSize={childrenSize}
          $gap={12}
        >
          {overlay}
        </OverlayWrapper>
      </Portal>
    </>
  )
}

export default Dropdown
