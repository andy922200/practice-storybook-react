import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Pagination from './Pagination'

// Story Meta
const meta: Meta<typeof Pagination> = {
  title: 'Data Display Elements/Pagination',
  component: Pagination,
  excludeStories: ['actions'],
}

export default meta

// Stories
type Story = StoryObj<typeof Pagination>

const DefaultHook = ({
  pageSize,
  total,
  withEllipsis,
  themeColor,
}: {
  pageSize: number
  total: number
  withEllipsis: boolean
  themeColor?: string
}) => {
  const [page, setPage] = useState(1)

  return (
    <Pagination
      page={page}
      pageSize={pageSize}
      total={total}
      withEllipsis={withEllipsis}
      themeColor={themeColor}
      onChange={({ current }) => setPage(current)}
    />
  )
}

export const Default: Story = {
  args: {
    pageSize: 20,
    total: 100,
    withEllipsis: false,
    themeColor: '',
  },
  render: ({ pageSize, total, withEllipsis, themeColor }) => (
    <DefaultHook
      themeColor={themeColor}
      pageSize={pageSize || 1}
      total={total || 0}
      withEllipsis={withEllipsis || false}
    />
  ),
}
