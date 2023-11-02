import { useRef } from 'react'
import styled from 'styled-components'
import { AccordionProps } from './Accordion'

const StyledPanel = styled.div<PanelProps>`
  max-height: ${(props) => props.$maxHeight}px;
  overflow: hidden;
  transition:
    max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    padding 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: ${(props) => (props.$isExpand ? '1rem' : '0 1rem')};
`

type PanelProps = Pick<AccordionProps, 'isExpand' | 'children'> & {
  $maxHeight?: number
  $isExpand?: boolean
}

const Panel = ({ children, isExpand }: PanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null)
  const scrollHeight = panelRef.current?.scrollHeight || 0

  return (
    <StyledPanel
      ref={panelRef}
      className="accordion__panel"
      $maxHeight={isExpand ? scrollHeight : 0}
      $isExpand={isExpand}
    >
      {children}
    </StyledPanel>
  )
}

export default Panel
