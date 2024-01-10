import { ReactNode, useEffect, useRef, useState, HTMLAttributes } from 'react'
import { FaSpinner } from 'react-icons/fa'
import styled from 'styled-components'
import { AddPrefix } from '@/common'
import { useColor } from '@/hook/useColor'

export interface SpinProps {
  className?: string
  isLoading?: boolean
  themeColor?: string
  indicator?: ReactNode
  children?: ReactNode
  rotateAnimation?: number
}

type InternalSpinProps = AddPrefix<Omit<SpinProps, 'children'>> & {
  $indicatorSize?: {
    width: number
    height: number
  }
}

const StyledSpin = styled.div<InternalSpinProps>`
  display: inline-flex;
  svg {
    color: ${(props) => props.$themeColor};
  }
`

const SpinContainer = styled.div<InternalSpinProps>`
  display: inline-flex;
  svg {
    color: ${(props) => props.$themeColor};
  }
  position: relative;
`

const Indicator = styled.div<InternalSpinProps>`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 4;
  display: block;
  width: 100%;
  height: 100%;
  max-height: 400px;
  & > * {
    position: absolute;
    top: calc(50% - ${(props) => (props.$indicatorSize?.height ?? 0) / 2}px);
    left: calc(50% - ${(props) => (props.$indicatorSize?.width ?? 0) / 2}px);
  }
`

const Mask = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff;
  opacity: 0.8;
`

const Spin = ({
  indicator = <FaSpinner />,
  isLoading = false,
  children,
  themeColor = '',
  ...props
}: SpinProps & HTMLAttributes<HTMLDivElement>) => {
  const { pickColor } = useColor()
  const pickedThemeColor = pickColor(themeColor || '')
  const indicatorRef = useRef<HTMLDivElement>(null)
  const [indicatorSize, setIndicatorSize] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    const indicatorElem = indicatorRef.current?.children[0]
    setIndicatorSize({
      width: indicatorElem?.clientWidth || 0,
      height: indicatorElem?.clientHeight || 0,
    })
  }, [indicatorRef, isLoading])

  if (!children) {
    return (
      <StyledSpin $themeColor={pickedThemeColor} {...props}>
        {indicator}
      </StyledSpin>
    )
  }
  return (
    <SpinContainer $themeColor={pickedThemeColor} {...props}>
      {children}
      {isLoading && (
        <>
          <Mask />
          <Indicator ref={indicatorRef} className="spin__indicator" $indicatorSize={indicatorSize}>
            {indicator}
          </Indicator>
        </>
      )}
    </SpinContainer>
  )
}

export default Spin
