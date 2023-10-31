import { ReactNode, HTMLAttributes, cloneElement, isValidElement } from 'react'
import { MdCancel } from 'react-icons/md'
import styled, { css, RuleSet } from 'styled-components'
import { AddPrefix } from '@/common'
import { useColor } from '@/hook/useColor'

export interface ChipProps {
  className?: string
  variant?: string
  themeColor?: string
  icon?: ReactNode
  deleteIcon?: ReactNode
  label?: string
  isDisabled?: boolean
  onDelete?: () => void
  children?: ReactNode
}

export enum ChipVariant {
  contained = 'contained',
  outlined = 'outlined',
}

type InternalChipProps = AddPrefix<Omit<ChipProps, 'children'>> & {
  $optionColor?: string
  $hasDelete?: boolean
}

const containedStyle = css<InternalChipProps>`
  background: ${(props) => props.$optionColor};
  color: #fff;
`

const outlinedStyle = css<InternalChipProps>`
  background: #fff;
  color: ${(props) => props.$optionColor};
`

const variantMap: Record<string, RuleSet<InternalChipProps>> = {
  contained: containedStyle,
  outlined: outlinedStyle,
}

const StyledChip = styled.div<InternalChipProps>`
  display: inline-flex;
  align-items: center;
  border-radius: 50px;
  height: 32px;
  border: 1px solid ${(props) => props.$optionColor};
  ${(props) => variantMap[props.$variant || 'contained']}
  ${(props) => props.$isDisabled && 'opacity: 0.5; cursor: not-allowed;'}

  .chip__start-icon {
    margin-left: 4px;
    margin-right: -6px;
  }

  .chip__end-icon {
    margin-right: 4px;
    margin-left: -6px;
    ${(props) => (props.$hasDelete ? 'cursor: pointer;' : null)}
    ${(props) => (props.$isDisabled ? 'cursor: not-allowed;' : null)}

    &:hover {
      ${(props) => (props.$hasDelete ? 'opacity: 0.8;' : null)}
      ${(props) => (props.$isDisabled ? 'cursor: not-allowed;' : null)}
    }
  }
`

const Label = styled.span`
  padding: 0px 12px;
`

const Chip = ({
  className,
  variant,
  label,
  themeColor,
  icon,
  isDisabled,
  deleteIcon,
  onDelete,
  children,
  ...props
}: ChipProps & HTMLAttributes<HTMLDivElement>) => {
  const { pickColor } = useColor()
  const optionColor = pickColor(themeColor || '')
  const endIcon = deleteIcon || <MdCancel />

  return (
    <StyledChip
      className={className}
      $variant={variant}
      $optionColor={optionColor}
      $hasDelete={!!onDelete}
      $isDisabled={isDisabled}
      {...props}
    >
      {isValidElement<ChipProps & HTMLAttributes<HTMLDivElement>>(icon) &&
        cloneElement(icon, {
          className: `chip__start-icon ${icon.props.className}`,
        })}
      <Label>{label || children}</Label>
      {(deleteIcon || onDelete) &&
        isValidElement<ChipProps & HTMLAttributes<HTMLDivElement>>(endIcon) &&
        cloneElement(endIcon, {
          className: `chip__end-icon ${endIcon.props.className}`,
          onClick: isDisabled ? undefined : onDelete,
        })}
    </StyledChip>
  )
}

export default Chip
