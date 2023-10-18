import { HTMLAttributes, cloneElement, ReactElement } from 'react'
import {
  MdCheckBoxOutlineBlank,
  MdOutlineCheckBox,
  MdOutlineRadioButtonUnchecked,
  MdOutlineRadioButtonChecked,
} from 'react-icons/md'
import styled from 'styled-components'
import { AddPrefix } from '@/common'
import { useColor } from '@/hook/useColor'

export type OptionValue = string | number | boolean | undefined
export interface OptionProps {
  isChecked?: boolean
  isDisabled?: boolean
  isRadio?: boolean
  themeColor?: string
  onClick?: () => void
  checkedIcon?: ReactElement
  unCheckedIcon?: ReactElement
  value?: OptionValue
}

type InternalOptionProps = AddPrefix<Omit<OptionProps, 'children'>> & {
  $optionColor?: string
}

const DISABLED_COLOR = '#dadada'
const StyledOption = styled.div<InternalOptionProps>`
  display: inline-flex;
  align-items: center;
  cursor: ${(props) => (props.$isDisabled ? 'not-allowed' : 'pointer')};
  color: ${(props) => (props.$isDisabled ? DISABLED_COLOR : '#222222')};

  & > *:not(:first-child) {
    margin-left: 8px;
  }

  .option__checked-icon {
    color: ${(props) => props.$optionColor};
  }

  .option__unchecked-icon {
    color: ${(props) => (props.$isDisabled ? DISABLED_COLOR : props.$optionColor)};
  }

  &:hover {
    .option__unchecked-icon {
      color: ${(props) => (props.$isDisabled ? DISABLED_COLOR : props.$optionColor)};
    }
  }
`

const Option = ({
  isChecked,
  isDisabled,
  isRadio,
  themeColor,
  onClick,
  checkedIcon,
  unCheckedIcon,
  children,
  ...props
}: OptionProps & HTMLAttributes<HTMLDivElement>) => {
  const { pickColor } = useColor()
  const optionColor = pickColor(themeColor || '')

  return (
    <StyledOption
      onClick={isDisabled ? undefined : onClick}
      $isDisabled={isDisabled}
      $optionColor={optionColor}
      {...props}
    >
      {isChecked &&
        (checkedIcon ? (
          cloneElement(checkedIcon, {
            className: 'option__checked-icon',
          })
        ) : isRadio ? (
          <MdOutlineRadioButtonChecked className="option__checked-icon" />
        ) : (
          <MdOutlineCheckBox className="option__checked-icon" />
        ))}

      {!isChecked &&
        (unCheckedIcon ? (
          cloneElement(unCheckedIcon, {
            className: 'option__unchecked-icon',
          })
        ) : isRadio ? (
          <MdOutlineRadioButtonUnchecked className="option__unchecked-icon" />
        ) : (
          <MdCheckBoxOutlineBlank className="option__unchecked-icon" />
        ))}

      {!!children && <span>{children}</span>}
    </StyledOption>
  )
}

export default Option
