import { ReactNode, ButtonHTMLAttributes } from 'react'
import { FaSpinner } from 'react-icons/fa'
import styled, { css, RuleSet } from 'styled-components'
import { AddPrefix } from '@/common'
import { useColor } from '@/hook/useColor'

export interface ButtonProps {
  className?: string
  variant?: string
  themeColor?: string
  startIcon?: ReactNode
  endIcon?: ReactNode
  isLoading?: boolean
  isDisabled?: boolean
  children?: ReactNode
}

type InternalButtonProps = AddPrefix<Omit<ButtonProps, 'children'>>

export enum ButtonVariant {
  contained = 'contained',
  outlined = 'outlined',
  text = 'text',
}

// props Style ( Start )
const containedStyle = css<InternalButtonProps>`
  background-color: ${(props) => props.$themeColor};
  color: #fff;
`

const outlinedStyle = css<InternalButtonProps>`
  background: #fff;
  color: ${(props) => props.$themeColor};
  border: 1px solid ${(props) => props.$themeColor};
  &:hover {
    background: ${(props) => `${props.$themeColor}1a`};
  }
`

const textStyle = css<InternalButtonProps>`
  background: #fff;
  color: ${(props) => props.$themeColor};
  &:hover {
    background: ${(props) => `${props.$themeColor}1a`};
  }
`

const disabledStyle = css<InternalButtonProps>`
  opacity: 0.5;
  cursor: not-allowed;
  &:hover,
  &:active {
    opacity:;
  }
`

const StartIcon = styled.span`
  margin-right: 0.5rem;
`

const EndIcon = styled.span`
  margin-left: 0.5rem;
`

const SpinnerStyle = styled.span`
  margin: 0 0.5rem;
`

const variantMap: Record<string, RuleSet<InternalButtonProps>> = {
  contained: containedStyle,
  outlined: outlinedStyle,
  text: textStyle,
}

const StyledButton = styled.button<InternalButtonProps>`
  border: none;
  outline: none;
  min-width: 100px;
  height: 36px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-radius: 4px;
  cursor: pointer;
  transition:
    color 0.2s,
    background-color 0.2s,
    border 0.2s,
    opacity 0.2s ease-in-out;

  ${(props) => variantMap[props.$variant || ButtonVariant.contained]}
  ${(props) => props.$isLoading && 'pointer-events: none; opacity: 0.5;'}

  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.7;
  }
  &:disabled {
    ${disabledStyle}
  }
`
// props Style ( End )

const Button = ({
  className,
  variant,
  themeColor,
  startIcon,
  endIcon,
  isLoading,
  isDisabled,
  children,
  ...props
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { pickColor } = useColor()
  const pickedThemeColor = pickColor(themeColor || '')

  return (
    <StyledButton
      type="button"
      className={className}
      disabled={isDisabled}
      $isLoading={isLoading}
      $variant={variant}
      $themeColor={pickedThemeColor}
      {...props}
    >
      <>
        {isLoading && (
          <SpinnerStyle>
            <FaSpinner />
          </SpinnerStyle>
        )}
        {startIcon && <StartIcon>{startIcon}</StartIcon>}
        <span>{children}</span>
        {endIcon && <EndIcon>{endIcon}</EndIcon>}
      </>
    </StyledButton>
  )
}

export default Button
