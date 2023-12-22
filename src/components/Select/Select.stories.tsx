import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Select from './Select'

// Story Meta
const meta: Meta<typeof Select> = {
  title: 'Data Display Elements/Select',
  component: Select,
  excludeStories: ['actions'],
}

export default meta

// Stories
type Story = StoryObj<typeof Select>

const demoOptions = [
  {
    value: 'all',
    label: '我全都要',
  },
  {
    value: 'AZ',
    label: 'AZ 疫苗',
  },
  {
    value: 'BNT',
    label: 'BNT 疫苗',
  },
  {
    value: 'Moderna',
    label: '莫德納疫苗',
  },
  {
    value: 'Vaccine',
    label: '高端疫苗',
  },
]

const DefaultHook = () => {
  const [selectedValue, setSelectedValue] = useState<string | string[]>([])

  return (
    <Select
      options={demoOptions}
      value={selectedValue}
      onSelect={(value) => setSelectedValue(value)}
      placeholder="請選擇預約疫苗"
      isMultiple={true}
    />
  )
}

export const Default: Story = {
  render: () => <DefaultHook />,
}
