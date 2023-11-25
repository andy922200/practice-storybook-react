import type { Meta, StoryObj } from '@storybook/react'
import Card from './Card'
import CardMeta from './CardMeta'

// Story Meta
const meta: Meta<typeof Card> = {
  title: 'Data Display Elements/Card',
  component: Card,
}

export default meta

// Stories
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: (args) => (
    <Card
      {...args}
      cover={<img src="https://picsum.photos/300/200" alt="" style={{ objectFit: 'cover' }} />}
    >
      <CardMeta
        avatarUrl="https://ithelp.ithome.com.tw/static/2021ironman/event/img/choose1.png"
        title="Demo Title"
        description="Hello World"
      />
    </Card>
  ),
}
