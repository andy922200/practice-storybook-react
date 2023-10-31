import type { Meta, StoryObj } from '@storybook/react'
import { MdMail } from 'react-icons/md'
import Badge from './Badge'

// Story Meta
const meta: Meta<typeof Badge> = {
  title: 'Data Display Elements/Badge',
  component: Badge,
  excludeStories: ['actions'],
}

export default meta

// Stories
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    children: (
      <div style={{ fontSize: '1.5rem' }}>
        <MdMail />
      </div>
    ),
    badgeContent: 2,
  },
}

export const Max: Story = {
  args: {
    ...Default.args,
    badgeContent: 1000,
  },
}

export const ShowZero: Story = {
  args: {
    ...Default.args,
    badgeContent: 0,
    showZero: true,
  },
}
