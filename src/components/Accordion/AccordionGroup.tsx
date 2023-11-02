import { Children, isValidElement, useState, cloneElement, HTMLAttributes } from 'react'
import styled from 'styled-components'
import { AccordionProps } from './Accordion'

const StyledAccordionGroup = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #587cb0;
  border-bottom: 1px solid #587cb0;
  & > *:not(:first-child) {
    margin-top: 1px;
  }
`

type AccordionGroupProps = {
  children?: React.ReactNode
  isAccordion?: boolean
}

const AccordionGroup = ({ children, isAccordion = false }: AccordionGroupProps) => {
  const [activeKey, setActiveKey] = useState(-1)

  const handleAccordionClick = (key: number) => {
    if (isAccordion) {
      setActiveKey(activeKey === key ? -1 : key)
    }
  }

  return (
    <StyledAccordionGroup className="accordion__group">
      {Children.map(children, (child, index) => {
        if (isValidElement<AccordionProps & HTMLAttributes<HTMLDivElement>>(child) && isAccordion) {
          return cloneElement(child, {
            isAccordion: true,
            onClick: () => handleAccordionClick(index),
            isExpand: activeKey === index,
          })
        }
        return child
      })}
    </StyledAccordionGroup>
  )
}

export default AccordionGroup
