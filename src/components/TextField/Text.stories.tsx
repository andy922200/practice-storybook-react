import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { FiSearch, FiEye } from 'react-icons/fi'
import TextField from './TextField'

// Story Meta
const meta: Meta<typeof TextField> = {
  title: 'Input Elements/TextField',
  component: TextField,
  excludeStories: ['actions'],
}

export default meta

// Story Mock Actions
export const actions = {
  onChange: action('onChange'),
}

// Stories
type Story = StoryObj<typeof TextField>

export const Default: Story = {
  args: {
    value: 'Default',
    onChange: actions.onChange,
  },
}

export const Disabled: Story = {
  args: {
    ...Default.args,
    isDisabled: true,
  },
}

export const Error: Story = {
  args: {
    ...Default.args,
    isError: true,
  },
}

export const Prefix: Story = {
  args: {
    ...Default.args,
    prefix: <FiSearch />,
  },
}

export const Suffix: Story = {
  args: {
    ...Default.args,
    suffix: <FiEye />,
  },
}

const TextFieldHook = () => {
  const [value, setValue] = useState('')
  return (
    <TextField value={value} onChange={(e) => setValue(e.target.value)} placeholder="Text..." />
  )
}

export const TextFieldHookAction: Story = {
  render: () => <TextFieldHook />,
}
