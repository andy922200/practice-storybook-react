import styled, { css, keyframes } from 'styled-components'
import { AddPrefix } from '@/common'
import { useColor } from '@/hook/useColor'

export interface ProgressBarProps {
  className?: string
  themeColor?: string
  value?: number
  showInfo?: boolean
  isStatusActive?: boolean
}

type InternalProgressBarProps = AddPrefix<Omit<ProgressBarProps, 'children'>>

const slide = keyframes`
  from {
    left: -150%;
  }
  to {
    left: 100%;
  }
`

const activeAnimation = css`
  position: relative;
  overflow: hidden;
  &:before {
    content: '';
    position: absolute;
    height: 100%;
    width: 80px;
    top: 0px;
    background: linear-gradient(to right, transparent 0%, #ffffff99 50%, transparent 100%);
    animation: ${slide} 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    box-shadow: 0 4px 10px 0 #ffffff33;
  }
`

const StyledProgressBar = styled.div`
  display: flex;
  align-items: center;
`

const Trail = styled.div`
  width: 100%;
  height: 8px;
  background: #eee;
  border-radius: 50px;
`

const Track = styled.div<InternalProgressBarProps>`
  background: ${(props) => props.$themeColor};
  width: ${(props) => props.$value}%;
  height: 8px;
  border-radius: 50px;
  transition: width 0.2s;
  ${(props) => props.$isStatusActive && activeAnimation}
`

const Info = styled.div`
  flex: 0 0 50px;
  text-align: right;
  margin-left: 4px;
`

const formatValue = (value: number) => {
  if (value > 100) return 100
  if (value < 0) return 0

  return value
}

const ProgressBar = ({
  className = '',
  value = 0,
  themeColor = '',
  showInfo = true,
  isStatusActive = false,
}: ProgressBarProps) => {
  const { pickColor } = useColor()
  const pickedThemeColor = pickColor(themeColor || '')

  return (
    <StyledProgressBar className={className}>
      <Trail className="progress-bar__trail">
        <Track
          className="progress-bar__track"
          $themeColor={pickedThemeColor}
          $value={formatValue(value || 0)}
          $isStatusActive={isStatusActive}
        />
      </Trail>
      {showInfo && <Info className="progress-bar__info">{`${value}%`}</Info>}
    </StyledProgressBar>
  )
}

export default ProgressBar
