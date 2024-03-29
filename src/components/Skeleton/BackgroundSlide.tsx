import { HTMLAttributes } from 'react'
import styled, { keyframes } from 'styled-components'

const slide = keyframes`
  from {
    left: -150%;
  }
  to {
    left: 100%;
  }
`

const StyledBackgroundSlide = styled.div`
  width: 12px;
  height: 12px;
  background: #eee;
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

const BackgroundSlide = (props: HTMLAttributes<HTMLDivElement>) => (
  <StyledBackgroundSlide {...props} />
)

export default BackgroundSlide
