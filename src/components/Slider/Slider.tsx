import { useRef, useState, InputHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'
import { AddPrefix } from '@/common'
import { useColor } from '@/hook/useColor'

export interface SliderProps {
  themeColor?: string
  thumbSize?: number
  min?: number
  max?: number
  step?: number
  showValue?: boolean
  onChange?: (value: number) => void
}

type InternalSliderProps = AddPrefix<Omit<SliderProps, 'children'>> & {
  $widthRatio?: number
}

const railStyle = css`
  background: #ddd; /* rail color */
  width: 320px;
  height: 6px;
  border-radius: 5px;
`

const trackStyle = css<InternalSliderProps>`
  background: ${(props) => props.$themeColor};
  border-radius: 5px;
  height: 6px;
`

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
`

const StyledSlider = styled.input<InternalSliderProps>`
  &[type='range'] {
    -webkit-appearance: none;
    outline: none;
    position: relative;
    z-index: 0;
    ${railStyle}

    &:before {
      content: '';
      position: absolute;
      z-index: -1;
      width: ${(props) => props.$widthRatio}%;
      left: 0px;
      ${trackStyle}
    }
  }

  &[type='range']::-webkit-slider-thumb {
    /* thumb style */
    -webkit-appearance: none;
    width: ${(props) => props.$thumbSize}px;
    height: ${(props) => props.$thumbSize}px;
    border-radius: 50%;
    border: 2px solid white;
    background: white;
    border: 0.4em solid ${(props) => props.$themeColor};
    cursor: pointer;
    transition:
      box-shadow 0.2s ease-in-out,
      transform 0.1s ease-in-out;
    &:hover {
      transform: scale(1.1);
      box-shadow: 0 0.4em 1em rgba(0, 0, 0, 0.15);
    }
    &:active {
      cursor: grabbing;
      transform: scale(0.975);
      box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
      background: ${(props) => props.$themeColor};
    }
  }
`

const Slider = ({
  min,
  max,
  step,
  defaultValue = 0,
  onChange,
  themeColor,
  thumbSize = 20,
  showValue = true,
  ...props
}: SliderProps & InputHTMLAttributes<HTMLInputElement>) => {
  const sliderRef = useRef<HTMLInputElement>(null)
  const [currentValue, setCurrentValue] = useState(
    Number(defaultValue) < Number(min) ? min : defaultValue,
  )
  const { pickColor } = useColor()
  const pickedThemeColor = pickColor(themeColor || '')

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (sliderRef.current) {
      setCurrentValue(sliderRef.current.value)
    }
    if (onChange) {
      onChange(event)
    }
  }

  return (
    <StyledWrapper>
      <StyledSlider
        ref={sliderRef}
        $widthRatio={(Number(currentValue) / Number(max)) * 100}
        $thumbSize={thumbSize}
        $themeColor={pickedThemeColor}
        type="range"
        min={min}
        max={max}
        step={step}
        defaultValue={defaultValue}
        onChange={handleOnChange}
        {...props}
      />
      {showValue && <p>{currentValue}</p>}
    </StyledWrapper>
  )
}

export default Slider
