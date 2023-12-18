import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Dropdown from './Dropdown'

// Story Meta
const meta: Meta<typeof Dropdown> = {
  title: 'Navigation Elements/Dropdown',
  component: Dropdown,
  excludeStories: ['actions'],
}

export default meta

// Stories
type Story = StoryObj<typeof Dropdown>

export const Default: Story = {
  args: {
    isOpen: false,
    isDisabled: false,
  },
  render: (args) => (
    <Dropdown {...args} overlay={<div>Menu</div>}>
      <button>Click me</button>
    </Dropdown>
  ),
}

const DemoHook = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dropdown
      isOpen={isOpen}
      onClick={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      overlay={
        <div>
          <option value="選項1">選項1</option>
          <option value="選項2">選項2</option>
          <option value="選項3">選項3</option>
          <option value="選項4">選項4</option>
        </div>
      }
    >
      <button>Dropdown</button>
    </Dropdown>
  )
}

export const Demo: Story = {
  render: () => <DemoHook />,
}
