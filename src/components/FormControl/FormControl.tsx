import {
  useState,
  HTMLAttributes,
  ChangeEvent,
  cloneElement,
  isValidElement,
  ReactNode,
} from 'react'
import styled, { css } from 'styled-components'
import { AddPrefix } from '@/common'
import { OptionProps } from '@/components/Option/Option'
import { SwitchProps } from '@/components/Switch/Switch'
import { TextFieldProps } from '@/components/TextField/TextField'
import { useColor } from '@/hook/useColor'

export type FormControlChildrenProps = OptionProps | SwitchProps | TextFieldProps

export type Placement =
  | 'top-left'
  | 'top'
  | 'top-right'
  | 'left'
  | 'right'
  | 'bottom-left'
  | 'bottom'
  | 'bottom-right'

export interface FormControlProps {
  className?: string
  isRequired?: boolean
  isError?: boolean
  errorMessage?: string
  maxLength?: number
  placement?: Placement
  label?: string
  children?: ReactNode
  onChange?: () => void
}

type InternalFormControlProps = AddPrefix<Omit<FormControlProps, 'children'>> & {
  $primaryColor?: string
  $errorColor?: string
  $disabledColor?: string
}

const topCommonStyle = css`
  flex-direction: column;
  & > *:not(:first-child) {
    margin-top: 8px;
  }
`

const bottomCommonStyle = css`
  flex-direction: column-reverse;
  & > *:not(:first-child) {
    margin-bottom: 8px;
  }
`

const ErrorMessage = styled.div<InternalFormControlProps>`
  font-size: 14px;
  margin-top: 4px !important;
  color: ${(props) => props.$errorColor};
`

const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const MaxLength = styled.div<InternalFormControlProps>`
  font-size: 14px;
  color: ${(props) => props.$primaryColor};
  display: flex;
  align-items: flex-end;
`

const RequiredSign = styled.span<InternalFormControlProps>`
  color: ${(props) => props.$errorColor};
`

const topLeftStyle = css`
  ${topCommonStyle}
`
const topStyle = css`
  align-items: center;
  ${topCommonStyle}
`
const topRightStyle = css`
  align-items: flex-end;
  ${topCommonStyle}
`
const bottomLeftStyle = css`
  ${bottomCommonStyle}
`
const bottomStyle = css`
  align-items: center;
  ${bottomCommonStyle}
`
const bottomRightStyle = css`
  align-items: flex-end;
  ${bottomCommonStyle}
`

const leftStyle = css`
  align-items: center;
  & > *:not(:first-child) {
    margin-left: 8px;
  }
`

const rightStyle = css`
  align-items: center;
  flex-direction: row-reverse;
  & > *:not(:first-child) {
    margin-right: 8px;
  }
`

const placementStyleMap = {
  'top-left': topLeftStyle,
  top: topStyle,
  'top-right': topRightStyle,
  left: leftStyle,
  right: rightStyle,
  'bottom-left': bottomLeftStyle,
  bottom: bottomStyle,
  'bottom-right': bottomRightStyle,
}

const StyledFormControl = styled.div<InternalFormControlProps>`
  display: inline-flex;
  ${(props) => {
    if (props.$placement) {
      return placementStyleMap[props.$placement]
    }
    return null
  }}
`

const FormControl = ({
  label,
  children,
  maxLength,
  placement = 'left',
  isError,
  errorMessage,
  isRequired,
  onChange,
  className,
  ...props
}: FormControlProps & HTMLAttributes<HTMLDivElement>) => {
  const [childrenValue, setChildrenValue] = useState('')
  const isSwitchComponent =
    isValidElement(children) &&
    typeof children.type !== 'string' &&
    children.type?.name === 'Switch'
  const { pickColor } = useColor()
  const primaryColor = pickColor('primary')
  const errorColor = pickColor('error')

  const handleOnChange = (event: ChangeEvent<HTMLInputElement & HTMLDivElement>) => {
    const targetValue = event?.target?.value
    if (maxLength && targetValue.length > maxLength) return

    setChildrenValue(targetValue)
    if (typeof onChange === 'function') {
      onChange(event)
    }
  }

  return (
    <StyledFormControl className={className} $placement={placement} {...props}>
      <LabelWrapper className="form-control__label-wrapper">
        <div className="form-control__label">
          {label}
          {isRequired && <RequiredSign $errorColor={errorColor}>*</RequiredSign>}
        </div>
        {maxLength && (
          <MaxLength
            $primaryColor={primaryColor}
          >{`${childrenValue?.length} / ${maxLength}`}</MaxLength>
        )}
      </LabelWrapper>
      {isSwitchComponent
        ? children
        : isValidElement<FormControlChildrenProps>(children) &&
          cloneElement(children, {
            isError,
            value: childrenValue,
            onChange: handleOnChange,
          })}
      {isError && errorMessage && (
        <ErrorMessage $errorColor={errorColor}>{errorMessage}</ErrorMessage>
      )}
    </StyledFormControl>
  )
}

export default FormControl
