import type { Meta, StoryObj } from '@storybook/react'
import Toast, { message, ToastType } from '../Toast/Toast'

// Story Meta
const meta: Meta<typeof Toast> = {
  title: 'Feedback Elements/Toast',
  component: Toast,
  excludeStories: ['actions'],
}

export default meta

// Stories
type Story = StoryObj<typeof Toast>

export const Default: Story = {
  args: {
    type: ToastType.info,
    content: 'This is a toast message',
    duration: 3000,
  },
  render: ({ type = ToastType.info, content, duration }) => {
    return <button onClick={() => message[type]({ type, content, duration })}>Show Toast</button>
  },
  argTypes: {
    type: {
      control: 'select',
      options: [ToastType.success, ToastType.info, ToastType.warning, ToastType.error],
    },
  },
}
