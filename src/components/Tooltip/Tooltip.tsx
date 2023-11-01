import { useState, useEffect, useRef, HTMLAttributes } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { AddPrefix } from '@/common'
import Portal from '@/components/Portal/Portal'
import { useColor } from '@/hook/useColor'

export enum TooltipPlacement {
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

export interface TooltipProps {
  className?: string
  showArrow?: boolean
  placement?: TooltipPlacement
  themeColor?: string
  content?: React.ReactNode | string
  children?: React.ReactNode | string
}

type InternalTooltipProps = AddPrefix<Omit<TooltipProps, 'children'>> & {
  $isVisible: boolean
  $position: {
    top: number
    left: number
  }
  $childrenSize: {
    width: number
    height: number
  }
  $gap: number
  $color: string
}

const topStyle = css<InternalTooltipProps>`
  transform: translate(
    calc(${(props) => props.$childrenSize.width / 2}px - 50%),
    calc(-100% - ${(props) => props.$gap}px)
  );
  .tooltip__arrow {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 40%);
  }
  .tooltip__arrow-content {
    width: 8px;
    height: 8px;
    transform: rotate(45deg);
    background: ${(props) => props.$color};
  }
`

const topLeftStyle = css<InternalTooltipProps>`
  transform: translate(0px, calc(-100% - ${(props) => props.$gap}px));
  .tooltip__arrow {
    position: absolute;
    left: 12px;
    transform: translate(0%, 40%);
  }
`

const topRightStyle = css<InternalTooltipProps>`
  transform: translate(
    calc(-100% + ${(props) => props.$childrenSize.width}px),
    calc(-100% - ${(props) => props.$gap}px)
  );
  .tooltip__arrow {
    position: absolute;
    right: 12px;
    transform: translate(0%, 40%);
  }
`

const bottomStyle = css<InternalTooltipProps>`
  transform: translate(
    calc(${(props) => props.$childrenSize.width / 2}px - 50%),
    ${(props) => props.$childrenSize.height + props.$gap}px
  );
  .tooltip__arrow {
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const bottomLeftStyle = css<InternalTooltipProps>`
  transform: translate(0px, ${(props) => props.$childrenSize.height + props.$gap}px);
  .tooltip__arrow {
    position: absolute;
    top: 0px;
    left: 12px;
    transform: translate(0%, -50%);
  }
`

const bottomRightStyle = css<InternalTooltipProps>`
  transform: translate(
    calc(-100% + ${(props) => props.$childrenSize.width}px),
    ${(props) => props.$childrenSize.height + props.$gap}px
  );
  .tooltip__arrow {
    position: absolute;
    top: 0px;
    right: 12px;
    transform: translate(0%, -50%);
  }
`

const rightTopStyle = css<InternalTooltipProps>`
  transform: translate(${(props) => props.$childrenSize.width + props.$gap}px, 0px);
  .tooltip__arrow {
    position: absolute;
    top: 12px;
    left: 0px;
    transform: translate(-50%, 0%);
  }
`

const rightStyle = css<InternalTooltipProps>`
  transform: translate(
    ${(props) => props.$childrenSize.width + props.$gap}px,
    calc(-50% + ${(props) => props.$childrenSize.height / 2}px)
  );
  .tooltip__arrow {
    position: absolute;
    top: 50%;
    left: 0px;
    transform: translate(-50%, -50%);
  }
`

const rightBottomStyle = css<InternalTooltipProps>`
  transform: translate(
    ${(props) => props.$childrenSize.width + props.$gap}px,
    calc(-100% + ${(props) => props.$childrenSize.height}px)
  );
  .tooltip__arrow {
    position: absolute;
    bottom: 12px;
    left: 0px;
    transform: translate(-50%, 0%);
  }
`

const leftBottomStyle = css<InternalTooltipProps>`
  transform: translate(
    calc(-100% - ${(props) => props.$gap}px),
    calc(-100% + ${(props) => props.$childrenSize.height}px)
  );
  .tooltip__arrow {
    position: absolute;
    bottom: 12px;
    right: 0px;
    transform: translate(50%, 0%);
  }
`

const leftStyle = css<InternalTooltipProps>`
  transform: translate(
    calc(-100% - ${(props) => props.$gap}px),
    calc(-50% + ${(props) => props.$childrenSize.height / 2}px)
  );
  .tooltip__arrow {
    position: absolute;
    top: 50%;
    right: 0px;
    transform: translate(50%, -50%);
  }
`

const leftTopStyle = css<InternalTooltipProps>`
  transform: translate(calc(-100% - ${(props) => props.$gap}px), 0px);
  .tooltip__arrow {
    position: absolute;
    top: 12px;
    right: 0px;
    transform: translate(50%, 0%);
  }
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

const TooltipWrapper = styled.div<InternalTooltipProps>`
  position: absolute;
  z-index: 999;
  top: ${(props) => props.$position.top}px;
  left: ${(props) => props.$position.left}px;
  background: ${(props) => props.$color};
  color: white;
  padding: 8px;
  border-radius: 4px;
  box-shadow:
    0 3px 6px -4px rgb(0 0 0 / 12%),
    0 6px 16px 0 rgb(0 0 0 / 8%),
    0 9px 28px 8px rgb(0 0 0 / 5%);
  animation: ${(props) => (props.$isVisible ? fadeIn : fadeOut)} 0.3s ease-in-out forwards;
  ${(props) => placementStyleMap[props.$placement || TooltipPlacement.top]}

  .tooltip__arrow-content {
    width: 8px;
    height: 8px;
    transform: rotate(45deg);
    background: ${(props) => props.$color};
  }
`

const Tooltip = ({
  children,
  placement = TooltipPlacement.top,
  themeColor,
  content,
  showArrow = true,
  className,
  ...props
}: TooltipProps & HTMLAttributes<HTMLDivElement>) => {
  const [isVisible, setIsVisible] = useState(false)
  const childrenRef = useRef<HTMLDivElement>(null)
  const [childrenSize, setChildrenSize] = useState({
    width: 0,
    height: 0,
  })
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
  })
  const { pickColor } = useColor()
  const color = pickColor(themeColor || '')

  const handleOnResize = () => {
    setChildrenSize({
      width: childrenRef.current?.offsetWidth || 0,
      height: childrenRef.current?.offsetHeight || 0,
    })
    setPosition({
      top: childrenRef.current?.getBoundingClientRect().top || 0,
      left: childrenRef.current?.getBoundingClientRect().left || 0,
    })
  }

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
        ref={childrenRef}
        onMouseOver={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(true)}
      >
        {children}
      </span>
      <Portal rootId="tooltip">
        <TooltipWrapper
          $isVisible={isVisible}
          $position={position}
          $placement={placement}
          $childrenSize={childrenSize}
          $gap={12}
          $color={color}
          className={className}
          {...props}
        >
          {content}
          {showArrow && (
            <div className="tooltip__arrow">
              <div className="tooltip__arrow-content" />
            </div>
          )}
        </TooltipWrapper>
      </Portal>
    </>
  )
}

export default Tooltip
