import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { FaHeartbeat } from 'react-icons/fa'
import Rate from './Rate'

// Story Meta
const meta: Meta<typeof Rate> = {
  title: 'Input Elements/Rate',
  component: Rate,
  excludeStories: ['actions'],
}

export default meta

// Stories
type Story = StoryObj<typeof Rate>

export const Default: Story = {
  args: {
    count: 5,
    themeColor: '#38e56d',
  },
}

export const AllowedHalf: Story = {
  args: {
    ...Default.args,
    allowHalf: true,
  },
}

export const Disabled: Story = {
  args: {
    ...Default.args,
    defaultValue: 3,
    isDisabled: true,
  },
}

export const CustomIcon: Story = {
  args: {
    ...Default.args,
    defaultValue: 3,
    character: <FaHeartbeat />,
    themeColor: '#e63737',
  },
}

const RateWithHook = () => {
  const [value, setValue] = useState(2)
  return (
    <Rate
      defaultValue={value}
      allowHalf
      onChange={(value) => {
        setValue(value)
      }}
    />
  )
}

export const RateWithHookAction: Story = {
  render: () => <RateWithHook />,
}
