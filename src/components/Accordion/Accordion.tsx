import { HTMLAttributes, useState, useEffect } from 'react'
import styled from 'styled-components'
import AccordionHeader from './AccordionHeader'
import AccordionPanel from './AccordionPanel'
import { AddPrefix } from '@/common'

export interface AccordionProps {
  className?: string
  isExpand?: boolean
  header?: React.ReactNode | string
  children?: React.ReactNode | string
  onClick?: () => void
  isAccordion?: boolean
}

export type InternalAccordionProps = AddPrefix<Omit<AccordionProps, 'children'>>

const StyledAccordion = styled.div`
  display: inline-flex;
  flex-direction: column;
  border: 1px solid #ddd;
`

const Accordion = ({
  header,
  children,
  isExpand = false,
  onClick,
  className,
  isAccordion = false,
}: AccordionProps & HTMLAttributes<HTMLDivElement>) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  useEffect(() => {
    if (isAccordion) {
      setIsExpanded(isExpand)
    }
  }, [isAccordion, isExpand])

  const handleClick = () => {
    isAccordion && onClick ? onClick() : setIsExpanded(!isExpanded)
  }

  return (
    <StyledAccordion className={className}>
      <AccordionHeader
        isExpand={isAccordion ? isExpand : isExpanded}
        onClick={handleClick}
        header={header}
      />
      <AccordionPanel isExpand={isAccordion ? isExpand : isExpanded}>{children}</AccordionPanel>
    </StyledAccordion>
  )
}

export default Accordion
