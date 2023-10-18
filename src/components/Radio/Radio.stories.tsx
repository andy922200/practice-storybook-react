import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { BiCheckbox, BiSolidCheckboxChecked } from 'react-icons/bi'
import { OptionValue } from '../Option/Option'
import Radio from './Radio'
import RadioGroup from './RadioGroup'

// Story Meta
const meta: Meta<typeof Radio> = {
  title: 'Input Elements/Radio',
  component: Radio,
  excludeStories: ['actions'],
}

export default meta

// Story Mock Actions
export const actions = {
  onClick: action('onClick'),
}

// Stories
type Story = StoryObj<typeof Radio>

export const Default: Story = {
  args: {
    children: 'Radio',
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
    checkedIcon: <BiSolidCheckboxChecked />,
    unCheckedIcon: <BiCheckbox />,
  },
}

const RadioHook = () => {
  const [isChecked, setIsChecked] = useState(false)
  return (
    <Radio isChecked={isChecked} onClick={() => setIsChecked(!isChecked)} value={isChecked}>
      Radio 1
    </Radio>
  )
}

export const RadioHookAction: Story = {
  render: () => <RadioHook />,
}

const RadioGroupHook = () => {
  const [value, setValue] = useState<OptionValue>('male')
  const onChange = (value: OptionValue) => {
    setValue(value)
  }

  return (
    <RadioGroup value={value} onChange={onChange} style={{ maxWidth: 500 }}>
      <Radio value="male">Male</Radio>
      <Radio value="female">Female</Radio>
      <Radio value="others">Others</Radio>
    </RadioGroup>
  )
}

export const RadioGroupHookAction: Story = {
  render: () => <RadioGroupHook />,
}
