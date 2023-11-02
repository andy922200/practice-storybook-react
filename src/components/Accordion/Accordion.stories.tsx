import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Accordion from './Accordion'
import AccordionGroup from './AccordionGroup'

// Story Meta
const meta: Meta<typeof Accordion> = {
  title: 'Data Display Elements/Accordion',
  component: Accordion,
}

export default meta

// Stories
type Story = StoryObj<typeof Accordion>

const DefaultHook = () => {
  const [isExpand, setIsExpand] = useState(false)

  return (
    <Accordion
      header="This is Header No.1"
      isExpand={isExpand}
      onClick={() => setIsExpand((prev) => !prev)}
    >
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum, enim? Autem optio excepturi
      natus nisi sed obcaecati, nam voluptates, ipsa odio cupiditate, et laudantium blanditiis ea
      minima omnis exercitationem animi!
    </Accordion>
  )
}

export const Default: Story = {
  render: () => <DefaultHook />,
}

export const AccordionDemo: Story = {
  name: 'Accordion',
  args: {
    isAccordion: true,
  },
  render: ({ isAccordion }) => (
    <AccordionGroup isAccordion={isAccordion}>
      {[...Array(4).keys()].map((key) => (
        <Accordion key={key} header={`header__${key + 1}`}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industrys standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
          Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </Accordion>
      ))}
    </AccordionGroup>
  ),
}
