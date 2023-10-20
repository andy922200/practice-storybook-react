import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import FormControl from './FormControl'
import Switch from '@/components/Switch/Switch'
import TextField from '@/components/TextField/TextField'

// Story Meta
const meta: Meta<typeof FormControl> = {
  title: 'Input Elements/FormControl',
  component: FormControl,
  excludeStories: ['actions'],
}

export default meta

// Story Mock Actions
export const actions = {
  // onClick: action('onClick'),
}

// Stories
type Story = StoryObj<typeof FormControl>

export const Default: Story = {
  args: {
    label: 'Test Label',
    children: <TextField placeholder="Enter......" />,
  },
}

const HookSwitch = () => {
  const [isChecked, setIsChecked] = useState(false)
  return (
    <Switch
      isChecked={isChecked}
      onChange={() => setIsChecked(!isChecked)}
      checkedChildren="On"
      unCheckedChildren="Off"
    />
  )
}

export const WithSwitch: Story = {
  args: {
    ...Default.args,
    children: <HookSwitch />,
  },
}
