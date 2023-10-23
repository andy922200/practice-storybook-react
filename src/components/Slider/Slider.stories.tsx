import type { Meta, StoryObj } from '@storybook/react'
import Slider from './Slider'

// Story Meta
const meta: Meta<typeof Slider> = {
  title: 'Input Elements/Slider',
  component: Slider,
  excludeStories: ['actions'],
}

export default meta

// Stories
type Story = StoryObj<typeof Slider>

export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    step: 5,
    showValue: true,
    themeColor: '#223344',
  },
}
