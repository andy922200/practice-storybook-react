import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { BiAbacus, BiAccessibility } from 'react-icons/bi'
import Checkbox from './Checkbox'

// Story Meta
const meta: Meta<typeof Checkbox> = {
  title: 'Input Elements/Checkbox',
  component: Checkbox,
  excludeStories: ['actions'],
}

export default meta

// Story Mock Actions
export const actions = {
  onClick: action('onClick'),
}

// Stories
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {
    children: 'Checkbox',
    themeColor: 'primary',
    onClick: actions.onClick,
  },
}

export const Checked: Story = {
  args: {
    ...Default.args,
    isChecked: true,
  },
}

export const Disabled: Story = {
  args: {
    ...Default.args,
    isDisabled: true,
  },
}

export const CustomizedIcon: Story = {
  args: {
    ...Default.args,
    isChecked: false,
    checkedIcon: <BiAbacus />,
    unCheckedIcon: <BiAccessibility />,
  },
}

const CheckboxHook = () => {
  const [isChecked, setIsChecked] = useState(false)
  return (
    <Checkbox isChecked={isChecked} onClick={() => setIsChecked(!isChecked)} value={isChecked}>
      Checkbox
    </Checkbox>
  )
}

export const CheckboxHookAction: Story = {
  render: () => <CheckboxHook />,
}

const CheckboxGroupHook = () => {
  const [isChecked, setIsChecked] = useState(Array.from({ length: 3 }, () => ''))
  const list = ['Checkbox1', 'Checkbox2', 'Checkbox3']

  const handleCheckboxClick = (index: number, value: string) => {
    setIsChecked((prevState) => {
      const newState = [...prevState]
      newState[index] = newState[index] === value ? '' : value
      return newState
    })
  }

  return (
    <>
      {list.map((checkbox, index) => (
        <Checkbox
          key={index}
          isChecked={isChecked[index] === checkbox}
          onClick={() => handleCheckboxClick(index, checkbox)}
          value={checkbox}
        >
          {checkbox}
        </Checkbox>
      ))}
    </>
  )
}

export const CheckboxGroupHookAction: Story = {
  render: () => <CheckboxGroupHook />,
}
