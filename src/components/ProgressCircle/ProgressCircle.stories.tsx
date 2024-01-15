import type { Meta, StoryObj } from '@storybook/react'
import ProgressCircle from './ProgressCircle'

// Story Meta
const meta: Meta<typeof ProgressCircle> = {
  title: 'Feedback Elements/ProgressCircle',
  component: ProgressCircle,
  excludeStories: ['actions'],
}

export default meta

// Stories
type Story = StoryObj<typeof ProgressCircle>

export const Default: Story = {
  args: {
    value: 1,
    themeColor: '',
    strokeColor: {
      '0%': '#108ee9',
      '100%': '#87d068',
    },
  },
}

export const DifferentSize: Story = {
  args: {
    value: 1,
    themeColor: '',
  },
  render: ({ value }) => (
    <>
      <ProgressCircle value={value} />
      <ProgressCircle value={value} size={200} />
      <ProgressCircle value={value} size={300} />
    </>
  ),
}
