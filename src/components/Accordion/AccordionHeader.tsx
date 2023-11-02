import { FaArrowDown } from 'react-icons/fa'
import styled from 'styled-components'
import { AccordionProps, InternalAccordionProps } from './Accordion'

const StyledHeader = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;
  background: #587cb028;
  padding: 1rem;
  border: 0;
`

const ExpandIcon = styled.div<InternalAccordionProps>`
  display: inline-flex;
  align-items: center;
  transform: rotate(${(props) => (props.$isExpand ? 180 : 0)}deg);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`

const Header = ({
  header,
  isExpand = false,
  onClick,
}: Pick<AccordionProps, 'header' | 'isExpand' | 'onClick'>) => (
  <StyledHeader className="accordion__header" onClick={onClick}>
    {header}
    <ExpandIcon $isExpand={isExpand} className="accordion__header-expand-icon">
      <FaArrowDown style={{ fill: '#333333' }} />
    </ExpandIcon>
  </StyledHeader>
)

export default Header
