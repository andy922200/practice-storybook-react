import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Chip, { ChipVariant } from './Chip'

// Story Meta
const meta: Meta<typeof Chip> = {
  title: 'Data Display Elements/Chip',
  component: Chip,
  excludeStories: ['actions'],
}

export default meta

// Story Mock Actions
export const actions = {
  onDelete: action('onDelete'),
}

// Stories
type Story = StoryObj<typeof Chip>

export const Default: Story = {
  args: {
    children: 'Chip',
    onDelete: actions.onDelete,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [ChipVariant.contained, ChipVariant.outlined],
    },
  },
}

const ChipHook = () => {
  const [show, setShow] = useState(true)

  return (
    show && (
      <Chip
        variant={ChipVariant.outlined}
        onDelete={() => {
          setShow(false)
        }}
      >
        Chip
      </Chip>
    )
  )
}

export const ChipHookAction: Story = {
  render: () => <ChipHook />,
}
