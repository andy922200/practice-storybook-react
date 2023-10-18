import { HTMLAttributes, Children, cloneElement, isValidElement, ReactNode } from 'react'
import styled from 'styled-components'
import { OptionProps, OptionValue } from '../Option/Option'
import { AddPrefix } from '@/common'

export interface RadioGroupProps {
  value?: OptionValue
  onChange?: (value: OptionValue) => void
  columns?: number
  children: ReactNode
}

type InternalRadioGroupProps = AddPrefix<Omit<RadioGroupProps, 'children'>> & {
  $childrenCount: number
}

const StyledRadioGroup = styled.div<InternalRadioGroupProps>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$columns}, 1fr);
  grid-gap: 8px;
`

const RadioGroup = ({
  value,
  children,
  onChange,
  columns,
  ...props
}: RadioGroupProps & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>) => {
  const childrenCount = Children.count(children)
  const handleOnClick = (targetValue: OptionValue) => {
    if (onChange) {
      onChange(targetValue)
    }
  }

  return (
    <StyledRadioGroup $columns={columns || 1} $childrenCount={childrenCount} {...props}>
      {Children.map(children, (child) => {
        if (isValidElement<OptionProps & HTMLAttributes<HTMLDivElement>>(child)) {
          return cloneElement(child, {
            onClick: () => handleOnClick(child.props.value),
            isChecked: child.props.value === value,
          })
        }
        return null
      })}
    </StyledRadioGroup>
  )
}

export default RadioGroup
