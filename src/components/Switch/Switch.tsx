import { useState, useLayoutEffect, useRef, HTMLAttributes } from 'react'
import styled, { css } from 'styled-components'
import { AddPrefix, Size } from '@/common'
import { useColor } from '@/hook/useColor'

export interface SwitchProps {
  size?: Size
  isChecked?: boolean
  isDisabled?: boolean
  themeColor?: string
  onChange?: () => void
  checkedChildren?: string
  unCheckedChildren?: string
}

type InternalSwitchProps = AddPrefix<Omit<SwitchProps, 'children'>> & {
  $thumbSize?: number
  $switchWidth?: number
  $switchColor?: string
  $padding?: number
  $labelWidth?: number
}

// props Style ( Start )
const transitionStyle = css`
  transition:
    left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    right 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`

const SwitchButton = styled.div<InternalSwitchProps>`
  height: ${(props) => props.$thumbSize}px;
  width: ${(props) => props.$switchWidth}px;
  background: ${(props) => props.$switchColor};
  display: inline-flex;
  color: #fff;
  border-radius: 50px;
  position: relative;
  border: 3px solid ${(props) => props.$switchColor};
  cursor: ${(props) => (props.$isDisabled ? 'not-allowed' : 'pointer')};
  box-sizing: content-box;
  opacity: ${(props) => (props.$isDisabled ? 0.5 : 1)};
`

const Thumb = styled.div<InternalSwitchProps>`
  width: ${(props) => props.$thumbSize}px;
  height: ${(props) => props.$thumbSize}px;
  border-radius: 50px;
  background: #fff;
  position: absolute;
  ${(props) => {
    if (props.$isChecked) {
      return `left: ${Number(props.$switchWidth) - Number(props.$thumbSize)}px;`
    }
    return 'left: 0px;'
  }}
  ${transitionStyle}
`

const Label = styled.div<InternalSwitchProps>`
  position: absolute;
  font-size: 14px;
  white-space: nowrap;
  top: 50%;
  transform: translateY(-50%);
  padding: 0px ${(props) => props.$padding}px;
  ${(props) => {
    if (props.$isChecked) {
      return `right: ${Number(props.$switchWidth) - Number(props.$labelWidth)}px;`
    }
    return `
    right: 0px;
    `
  }}
  ${transitionStyle}
`
// props Style ( End )

const Switch = ({
  isChecked,
  isDisabled,
  size,
  themeColor,
  onChange,
  checkedChildren,
  unCheckedChildren,
  ...props
}: SwitchProps & HTMLAttributes<HTMLDivElement>) => {
  const labelRef = useRef<HTMLDivElement>(null)
  const [labelWidth, setLabelWidth] = useState(0)
  const thumbSize = size === 'sm' ? 12 : size === 'md' ? 18 : 24
  const switchWidth = thumbSize + labelWidth

  const { pickColor } = useColor()
  const switchColor = pickColor(themeColor || '')

  useLayoutEffect(() => {
    const minLabelSize = thumbSize * 1.2
    const currentLabelWidth = labelRef?.current?.clientWidth

    if (currentLabelWidth) {
      setLabelWidth(currentLabelWidth < minLabelSize ? minLabelSize : currentLabelWidth)
    }
  }, [labelRef?.current?.clientWidth, thumbSize, isChecked])

  return (
    <SwitchButton
      $switchWidth={switchWidth}
      $thumbSize={thumbSize}
      $switchColor={switchColor}
      $isDisabled={isDisabled}
      onClick={isDisabled ? undefined : onChange}
      {...props}
    >
      <Thumb $isChecked={isChecked} $thumbSize={thumbSize} $switchWidth={switchWidth} />
      <Label
        ref={labelRef}
        $padding={thumbSize / 3}
        $labelWidth={labelWidth}
        $switchWidth={switchWidth}
        $isChecked={isChecked}
      >
        {isChecked ? checkedChildren : unCheckedChildren}
      </Label>
    </SwitchButton>
  )
}

export default Switch
