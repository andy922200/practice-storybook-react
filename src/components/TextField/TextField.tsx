import { ReactNode, InputHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'
import { AddPrefix } from '@/common'
import { useColor } from '@/hook/useColor'

export interface TextFieldProps {
  className?: string
  prefix?: ReactNode
  suffix?: ReactNode
  placeholder?: string
  isError?: boolean
  isDisabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
type InternalTextFieldProps = AddPrefix<Omit<TextFieldProps, 'children'>> & {
  $errorColor?: string
  $disabledColor?: string
}

const errorStyle = css<InternalTextFieldProps>`
  border: 1px solid ${(props) => props.$errorColor};
  &:hover {
    border: 1px solid ${(props) => props.$errorColor};
  }
`

const disabledStyle = css<InternalTextFieldProps>`
  border: 1px solid ${(props) => props.$disabledColor};
  cursor: not-allowed;
  background: ${(props) => props.$disabledColor}22;
  .text-field__input {
    cursor: not-allowed;
    background: none;
  }
  &:hover {
    border: 1px solid ${(props) => props.$disabledColor};
  }
`

const Input = styled.input`
  outline: none;
  border: none;
  font-size: 14px;
  color: #333;
  width: 100%;
`

const StyledTextField = styled.div<InternalTextFieldProps>`
  display: inline-flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px 12px;
  box-sizing: border-box;
  height: 36px;

  &:hover {
    border: 1px solid #222;
  }

  ${(props) => (props.$isError ? errorStyle : null)}
  ${(props) => (props.$isDisabled ? disabledStyle : null)}
`

const TextField = ({
  className,
  prefix,
  suffix,
  isError,
  isDisabled,
  onChange,
  ...props
}: TextFieldProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'>) => {
  const { pickColor } = useColor()
  const errorColor = pickColor('error')
  const disabledColor = pickColor('disabled')

  return (
    <StyledTextField
      className={className}
      $isError={isError}
      $isDisabled={isDisabled}
      $errorColor={errorColor}
      $disabledColor={disabledColor}
    >
      {prefix}
      <Input
        type="text"
        className="text-field__input"
        disabled={isDisabled}
        onChange={onChange}
        {...props}
      />
      {suffix}
    </StyledTextField>
  )
}

export default TextField
