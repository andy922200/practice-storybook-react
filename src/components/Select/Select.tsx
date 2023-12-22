import { useState } from 'react'
import { FaSpinner, FaArrowDown } from 'react-icons/fa'
import styled, { css } from 'styled-components'
import Dropdown, { DropdownPlacement } from '../Dropdown/Dropdown'
import { AddPrefix } from '@/common'

export interface SelectOption {
  label: string
  value: string
}

export interface SelectProps {
  options?: SelectOption[]
  isLoading?: boolean
  isDisabled?: boolean
  value?: string | string[]
  placeholder?: string
  onSelect?: (value: string | string[]) => void
  isMultiple?: boolean
}

type InternalSelectProps = AddPrefix<Omit<SelectProps, 'children'>> & {
  $isSelected?: boolean
  $isOpen?: boolean
}

const selectBoxEnable = css`
  color: #333;
  &:hover {
    border: 1px solid #222;
  }
`

const selectBoxDisable = css`
  background: #f5f5f5;
  color: #00000040;
`

const SelectBox = styled.div<InternalSelectProps>`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  height: 38px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  min-width: 180px;

  & > *:not(:first-child) {
    display: flex;
    align-items: center;
    margin-left: 12px;
  }

  ${(props) => (props.$isDisabled ? selectBoxDisable : selectBoxEnable)}
`

const ArrowDown = styled.div<InternalSelectProps>`
  height: 24px;
  width: 24px;
  transform: rotate(${(props) => (props.$isOpen ? 180 : 0)}deg);
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
`

const Menu = styled.div`
  min-width: 180px;
  display: inline-flex;
  flex-direction: column;
`

const MenuItem = styled.div<InternalSelectProps>`
  display: inline-flex;
  align-items: center;
  height: 38px;
  padding: 6px 12px;
  box-sizing: border-box;
  cursor: pointer;
  color: ${(props) => (props.$isSelected ? '#3091fd' : '#222')};

  &:hover {
    background: #e7f4f9;
  }
`

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
`

const Select = ({
  options,
  value,
  onSelect,
  placeholder,
  isDisabled,
  isLoading,
  isMultiple = false,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValues, setSelectedValues] = useState<string | string[]>(
    isMultiple ? (Array.isArray(value) ? value : []) : value || '',
  )

  // 更新選擇項目的邏輯
  const handleSelectItem = (selectedValue: string) => {
    if (isMultiple && Array.isArray(selectedValues)) {
      selectedValues.includes(selectedValue)
        ? setSelectedValues(selectedValues.filter((val) => val !== selectedValue))
        : setSelectedValues([...selectedValues, selectedValue])
    } else {
      setSelectedValues(selectedValue)
    }

    if (onSelect) {
      onSelect(selectedValues)
    }
  }

  return (
    <Dropdown
      isOpen={isOpen}
      onClick={() => (isDisabled || isLoading ? null : setIsOpen(true))}
      onClose={() => setIsOpen(false)}
      placement={DropdownPlacement.bottomLeft}
      overlay={
        isOpen && (
          <Menu>
            {options?.map((option) => (
              <MenuItem
                key={option.value}
                role="presentation"
                $isSelected={
                  isMultiple ? selectedValues.includes(option.value) : option.value === value
                }
                onClick={() => {
                  handleSelectItem(option?.value)
                  setIsOpen(false)
                }}
              >
                {option.label}
              </MenuItem>
            ))}
          </Menu>
        )
      }
    >
      <SelectBox $isDisabled={isDisabled || isLoading}>
        <span>
          {isMultiple && Array.isArray(selectedValues)
            ? selectedValues.length !== 0
              ? selectedValues.join(', ')
              : placeholder
            : selectedValues || placeholder}
        </span>
        {isLoading ? (
          <Loading>
            <FaSpinner />
          </Loading>
        ) : (
          <ArrowDown $isOpen={isOpen}>
            <FaArrowDown />
          </ArrowDown>
        )}
      </SelectBox>
    </Dropdown>
  )
}

export default Select
