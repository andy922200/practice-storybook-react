import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import styled from 'styled-components'
import Tabs from './Tabs'

// Story Meta
const meta: Meta<typeof Tabs> = {
  title: 'Data Display Elements/Tabs',
  component: Tabs,
}

export default meta

// Stories
type Story = StoryObj<typeof Tabs>

const tabOptions = [
  {
    value: 'item-one',
    label: 'ITEM ONE',
  },
  {
    value: 'item-two',
    label: 'ITEM TWO',
  },
  {
    value: 'item-three',
    label: 'ITEM THREE',
  },
  {
    value: 'item-four',
    label: 'ITEM FOUR',
  },
]

const StyledTabs = styled(Tabs)`
  border-bottom: 1px solid #eee;
`

const TabPanel = styled.div`
  padding: 20px 0px;
`

const DefaultHook = () => {
  const [selectedValue, setSelectedValue] = useState(tabOptions[0].value)

  return (
    <>
      <StyledTabs
        value={selectedValue}
        options={tabOptions}
        onChange={(value: string) => setSelectedValue(value)}
      />
      <TabPanel>{`TabPanel of #${selectedValue}`}</TabPanel>
    </>
  )
}

export const Default: Story = {
  render: () => <DefaultHook />,
}
