import type { Meta, StoryObj } from '@storybook/react'
import styled from 'styled-components'
import Table from './Table'
import Button from '@/components/Button/Button'

// Story Meta
const meta: Meta<typeof Table> = {
  title: 'Data Display Elements/Table',
  component: Table,
}

export default meta

// Stories
type Story = StoryObj<typeof Table>

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 130,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 65,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
]

const dataSource = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
]

const StickyStyle = styled(Table)`
  width: 100%;
  * {
    border: none;
    white-space: nowrap;
    text-align: left;
  }
  th {
    background: #fafafa;
  }
  tr {
    border-bottom: 1px solid #f0f0f0;
  }
  thead tr th {
    position: sticky;
    top: 0;
  }
`

export const Default: Story = {
  args: {
    columns,
    dataSource,
  },
}

export const Sticky: Story = {
  args: {
    columns: columns.map((column, index) => ({ ...column, fixed: index === 0 })),
    dataSource,
    maxWidth: '250px',
  },
  render: (args) => <StickyStyle {...args} />,
}

export const CustomContent: Story = {
  args: {
    columns: [
      ...columns,
      { title: 'Action', key: 'custom', render: () => <Button>Click!</Button> },
    ],
    dataSource,
  },
}
