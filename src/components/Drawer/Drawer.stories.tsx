import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Button from '../Button/Button'
import Drawer, { DrawerPlacement } from './Drawer'

// Story Meta
const meta: Meta<typeof Drawer> = {
  title: 'Navigation Elements/Drawer',
  component: Drawer,
  excludeStories: ['actions'],
}

export default meta

// Stories
type Story = StoryObj<typeof Drawer>

const DemoHook = ({ placement }: { placement: DrawerPlacement }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button variant="outlined" onClick={() => setIsOpen(true)}>
        Open
      </Button>
      <Drawer placement={placement} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div style={{ width: 300 }}>Drawer content</div>
      </Drawer>
    </>
  )
}

export const Default: Story = {
  args: {
    placement: DrawerPlacement.left,
  },
  render: ({ placement }) => <DemoHook placement={placement || DrawerPlacement.left} />,
}
