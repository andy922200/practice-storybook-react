import { ReactNode, HTMLAttributes, Children, useState } from 'react'
import { MdArrowForwardIos } from 'react-icons/md'
import styled from 'styled-components'
import { AddPrefix } from '@/common'

export interface BreadcrumbProp {
  to?: string
  label?: string
  icon?: ReactNode
}

export interface BreadcrumbsProps {
  separator?: ReactNode
  maxItems?: number
}

type InternalBreadcrumbsProps = AddPrefix<Omit<BreadcrumbsProps, 'children'>>

const StyledBreadcrumbs = styled.div<InternalBreadcrumbsProps>`
  display: flex;
  align-items: center;
`

const Separator = styled.span`
  margin: 0px 8px;
  display: flex;
  align-items: center;
`

const CollapsedContent = styled.span`
  cursor: pointer;
`

const Breadcrumbs = ({
  children,
  maxItems = 5,
  separator = MdArrowForwardIos,
}: BreadcrumbsProps & HTMLAttributes<HTMLDivElement>) => {
  const [isCollapse, setIsCollapse] = useState((maxItems || 0) < Children.count(children))

  if (isCollapse) {
    return (
      <StyledBreadcrumbs>
        {Array.isArray(children) && children[0]}
        <Separator>{separator}</Separator>
        <CollapsedContent role="presentation" onClick={() => setIsCollapse(false)}>
          ...
        </CollapsedContent>
        <Separator>{separator}</Separator>
        {Array.isArray(children) && children[Children.count(children) - 1]}
      </StyledBreadcrumbs>
    )
  }

  return (
    <StyledBreadcrumbs>
      {Children.map(children, (child, index) => {
        const isLast = index === Children.count(children) - 1
        return (
          <>
            {child}
            {isLast ? null : <Separator>{separator}</Separator>}
          </>
        )
      })}
    </StyledBreadcrumbs>
  )
}

export default Breadcrumbs
