import type { Meta, StoryObj } from '@storybook/react'
import Modal from '../Modal/Modal'

// Story Meta
const meta: Meta<typeof Modal> = {
  title: 'Feedback Elements/Modal',
  component: Modal,
  excludeStories: ['actions'],
}

export default meta

// Stories
type Story = StoryObj<typeof Modal>

export const Default: Story = {
  args: {
    isOpen: false,
    hasMask: true,
  },
  render: ({ isOpen, hasMask }) => {
    return (
      <Modal isOpen={isOpen} hasMask={hasMask}>
        <div>Modal Content</div>
      </Modal>
    )
  },
}
