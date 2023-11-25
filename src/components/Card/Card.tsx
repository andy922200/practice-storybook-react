import { HTMLAttributes } from 'react'
import styled, { css, RuleSet } from 'styled-components'
import { AddPrefix } from '@/common'

export interface CardProps {
  className?: string
  variant?: CardVariant
  cover?: React.ReactNode
  footer?: React.ReactNode
}

export type InternalCardProps = AddPrefix<Omit<CardProps, 'children'>>

export enum CardVariant {
  vertical = 'vertical',
  horizontal = 'horizontal',
  'horizontal-reverse' = 'horizontal-reverse',
}

const verticalStyle = css`
  display: inline-flex;
  flex-direction: column;
`

const horizontalStyle = css`
  display: flex;
`

const horizontalReverseStyle = css`
  display: flex;
  flex-direction: row-reverse;
`

const variantMap: Record<CardVariant, RuleSet<InternalCardProps>> = {
  vertical: verticalStyle,
  horizontal: horizontalStyle,
  'horizontal-reverse': horizontalReverseStyle,
}

const StyledCard = styled.div<InternalCardProps>`
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;

  ${(props) => variantMap[props.$variant || CardVariant.vertical]}
`

const Cover = styled.div`
  overflow: hidden;
  width: 300px;
  img {
    width: 100%;
    display: block;
  }
`

const SpaceBetween = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Card = ({
  className,
  cover,
  variant = CardVariant.vertical,
  children,
  footer,
  ...props
}: CardProps & HTMLAttributes<HTMLDivElement>) => (
  <StyledCard className={className} $variant={variant} {...props}>
    <Cover className="card__cover">{cover}</Cover>
    <SpaceBetween>
      {children}
      {footer}
    </SpaceBetween>
  </StyledCard>
)

export default Card
