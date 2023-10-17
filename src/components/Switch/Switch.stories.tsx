import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Size } from '../../common'
import Switch from './Switch'

// Story Meta
const meta: Meta<typeof Switch> = {
  title: 'Input Elements/Switch',
  component: Switch,
  excludeStories: ['actions'],
}

export default meta

// Story Mock Actions
export const actions = {
  onChange: action('onChange'),
}

// Stories
type Story = StoryObj<typeof Switch>

export const Default: Story = {
  args: {
    isChecked: false,
    isDisabled: false,
    size: Size.small,
    themeColor: 'primary',
    checkedChildren: 'On',
    unCheckedChildren: 'Off',
    onChange: actions.onChange,
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

export const HookAction: Story = {
  render: () => <HookSwitch />,
}
