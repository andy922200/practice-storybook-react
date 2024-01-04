import { HTMLAttributes } from 'react'
import styled, { css } from 'styled-components'
import { AddPrefix } from '@/common'

export interface TabProps {
  label?: string
  value?: string
  color?: string
  isActive?: boolean
  onClick?: () => void
}

type InternalTabProps = AddPrefix<Omit<TabProps, 'children'>>

const activeStyle = css<InternalTabProps>`
  color: ${(props) => props.$color} !important;
`

const StyledTab = styled.div<InternalTabProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 120px;
  height: 48px;
  &:hover {
    background: #eeeeee55;
  }
  ${(props) => (props.$isActive ? activeStyle : null)}
`

const Tab = ({
  label,
  value,
  isActive,
  onClick,
  color,
  ...props
}: TabProps & HTMLAttributes<HTMLDivElement>) => (
  <StyledTab
    className="tab__tab-button"
    $value={value}
    $isActive={isActive}
    $color={color}
    onClick={onClick}
    {...props}
  >
    <span>{label}</span>
  </StyledTab>
)

export default Tab
