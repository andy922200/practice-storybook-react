import type { Meta, StoryObj } from '@storybook/react'
import Carousel from './Carousel'

// Story Meta
const meta: Meta<typeof Carousel> = {
  title: 'Data Display Elements/Carousel',
  component: Carousel,
  excludeStories: ['actions'],
}

export default meta

// Stories
type Story = StoryObj<typeof Carousel>

export const Default: Story = {
  args: {
    dataSource: [
      'https://picsum.photos/id/1/300',
      'https://picsum.photos/id/10/300',
      'https://picsum.photos/id/17/300',
      'https://picsum.photos/id/20/300',
      'https://picsum.photos/id/29/300',
    ],
    hasControlArrow: true,
    hasDots: true,
    autoplay: false,
    imgWidth: 300,
    imgHeight: 300,
    autoplaySpeed: 5000,
  },
}
