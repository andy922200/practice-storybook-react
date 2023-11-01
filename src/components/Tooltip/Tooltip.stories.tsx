import type { Meta, StoryObj } from '@storybook/react'
import Tooltip, { TooltipPlacement } from './Tooltip'

// Story Meta
const meta: Meta<typeof Tooltip> = {
  title: 'Data Display Elements/Tooltip',
  component: Tooltip,
  excludeStories: ['actions'],
}

export default meta

// Stories
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  args: {
    content: 'Tooltip content',
    placement: TooltipPlacement.top,
    themeColor: '#d82258',
  },
  render: ({ content, placement, themeColor, showArrow, className }) => (
    <div
      style={{
        width: '100%',
        height: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Tooltip
        content={content}
        placement={placement}
        themeColor={themeColor}
        showArrow={showArrow}
        className={className}
      >
        <span style={{ border: '1px solid black', display: 'block', padding: '2px' }}>
          Hover me
        </span>
      </Tooltip>
    </div>
  ),
}
