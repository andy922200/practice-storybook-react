import { useState, useRef, useEffect, useCallback } from 'react'
import styled, { css } from 'styled-components'
import { AddPrefix } from '@/common'
import { useColor } from '@/hook/useColor'

export interface ProgressCircleProps {
  className?: string
  themeColor?: string
  value?: number
  isClockwise?: boolean
  strokeColor?: Record<string, string>
  size?: number
}

export type InternalProgressCircleProps = AddPrefix<Omit<ProgressCircleProps, 'children'>> & {
  $strokeWidth?: number
  $argLength?: number
  $isClockwise?: boolean
  $strokeColor?: Record<string, string>
  $internalSize?: number
}

const INFINITE = 999999

const counterClockwiseStyle = css`
  .progress-circle__progress {
    transform: rotateY(180deg);
  }
`

const StyledProgressCircle = styled.div<InternalProgressCircleProps>`
  position: relative;
  display: inline-flex;
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  ${(props) => (props.$isClockwise ? null : counterClockwiseStyle)}

  svg {
    transform: rotate(-90deg);
  }

  circle {
    stroke-width: ${(props) => props.$strokeWidth}px;
    fill: transparent;
  }

  .progress-circle__rail {
    stroke: #eee;
  }

  .progress-circle__track {
    stroke: ${(props) => (props.$strokeColor ? 'url(#linearGradient)' : props.$themeColor)};
    stroke-dasharray: ${(props) => props.$argLength} ${INFINITE};
    transition: stroke-dasharray 0.5s linear;
  }
`

const Info = styled.div<InternalProgressCircleProps>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .progress-circle__value {
    font-size: ${(props) => (props.$internalSize ?? 0) / 4}px;
  }
  .progress-circle__percent-sign {
    font-size: ${(props) => (props.$internalSize ?? 0) / 6}px;
  }
`

const formatValue = (value: number) => {
  if (value > 100) return 100
  if (value < 0) return 0
  return value
}

const ProgressCircle = ({
  className,
  themeColor = '',
  value = 0,
  isClockwise = true,
  strokeColor,
  size = 100,
}: ProgressCircleProps) => {
  const progressCircleRef = useRef<HTMLDivElement>(null)
  const [internalSize, setInternalSize] = useState(size)
  const { pickColor } = useColor()
  const pickedThemeColor = pickColor(themeColor || '')

  const defaultStrokeWidth = internalSize * 0.08
  const radius = (internalSize - defaultStrokeWidth) / 2
  const perimeter = radius * 2 * Math.PI // 圓周長
  const argLength = perimeter * (formatValue(value) / 100) // 弧長

  const handleUpdateSize = useCallback(() => {
    const currentElem = progressCircleRef.current
    setInternalSize(currentElem?.clientWidth || 0)
  }, [])

  useEffect(() => {
    handleUpdateSize()
    window.addEventListener('resize', handleUpdateSize)
    return () => {
      window.removeEventListener('resize', handleUpdateSize)
    }
  }, [handleUpdateSize])

  return (
    <StyledProgressCircle
      ref={progressCircleRef}
      className={className}
      $themeColor={pickedThemeColor}
      $strokeWidth={defaultStrokeWidth}
      $argLength={argLength}
      $isClockwise={isClockwise}
      $strokeColor={strokeColor}
    >
      <span className="progress-circle__progress">
        <svg
          width={internalSize}
          height={internalSize}
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          {strokeColor && (
            <defs>
              <linearGradient id="linearGradient">
                {Object.keys(strokeColor || {}).map((offset) => (
                  <stop key={offset} offset={offset} stopColor={strokeColor[offset]} />
                ))}
              </linearGradient>
            </defs>
          )}
          <circle
            className="progress-circle__rail"
            r={radius}
            cx={internalSize / 2}
            cy={internalSize / 2}
          />
          {value > 0 && (
            <circle
              className="progress-circle__track"
              r={radius}
              cx={internalSize / 2}
              cy={internalSize / 2}
              strokeLinecap="round"
            />
          )}
        </svg>
      </span>
      <Info className="progress-circle__info" $internalSize={internalSize}>
        <span className="progress-circle__value">{value}</span>
        <span className="progress-circle__percent-sign">%</span>
      </Info>
    </StyledProgressCircle>
  )
}

export default ProgressCircle
