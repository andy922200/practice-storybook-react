import { ReactNode, HTMLAttributes } from 'react'
import styled, { css, RuleSet } from 'styled-components'
import { AddPrefix } from '@/common'
import { useColor } from '@/hook/useColor'

export enum BadgeVariant {
  dot = 'dot',
  standard = 'standard',
}

export enum BadgePlacement {
  TopLeft = 'top-left',
  TopRight = 'top-right',
  BottomLeft = 'bottom-left',
  BottomRight = 'bottom-right',
}

export interface BadgeProps {
  className?: string
  badgeContent?: ReactNode
  themeColor?: string
  placement?: BadgePlacement
  max?: number
  variant?: BadgeVariant
  showZero?: boolean
}

type InternalBadgeProps = AddPrefix<Omit<BadgeProps, 'children'>>

const BadgeWrapper = styled.div`
  display: inline-flex;
  position: relative;
`

const topLeftStyle = css`
  top: 0px;
  left: 0px;
  transform: translate(-50%, -50%);
`

const topRightStyle = css`
  top: 0px;
  right: 0px;
  transform: translate(50%, -50%);
`

const bottomLeftStyle = css`
  bottom: 0px;
  left: 0px;
  transform: translate(-50%, 50%);
`

const bottomRightStyle = css`
  bottom: 0px;
  right: 0px;
  transform: translate(50%, 50%);
`

const placementStyleMap: Record<string, RuleSet<InternalBadgeProps>> = {
  'top-left': topLeftStyle,
  'top-right': topRightStyle,
  'bottom-left': bottomLeftStyle,
  'bottom-right': bottomRightStyle,
}

const StandardBadge = styled.div<InternalBadgeProps>`
  display: flex;
  flex-flow: row wrap;
  place-content: center;
  align-items: center;
  position: absolute;
  box-sizing: border-box;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 500;
  font-size: 12px;
  min-width: 20px;
  padding: 0px 6px;
  height: 20px;
  border-radius: 10px;
  z-index: 1;
  transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: ${(props) => props.$themeColor};
  color: #fff;
  ${(props) => placementStyleMap[props.$placement || 'top-right']}
`

const DotBadge = styled.div<InternalBadgeProps>`
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 100%;
  background-color: ${(props) => props.$themeColor};
  ${(props) => placementStyleMap[props.$placement || 'top-right']}
`

const makeBadgeContent = ({
  showZero,
  max,
  badgeContent,
}: Pick<BadgeProps, 'showZero' | 'max' | 'badgeContent'>) => {
  if (badgeContent === 0) {
    return showZero ? '0' : null
  }
  return Number(badgeContent) > Number(max) ? `${max}+` : badgeContent
}

const Badge = ({
  children,
  themeColor,
  badgeContent,
  placement = BadgePlacement.TopRight,
  max = 99,
  variant = BadgeVariant.standard,
  className,
  showZero = false,
}: BadgeProps & HTMLAttributes<HTMLDivElement>) => {
  const { pickColor } = useColor()
  const color = pickColor(themeColor || '')
  const content = makeBadgeContent({ showZero, max, badgeContent })

  return (
    <BadgeWrapper>
      {children}
      {variant === BadgeVariant.dot && (
        <DotBadge className={className} $themeColor={color} $placement={placement} />
      )}
      {variant === BadgeVariant.standard && content && (
        <StandardBadge className={className} $themeColor={color} $placement={placement}>
          {content}
        </StandardBadge>
      )}
    </BadgeWrapper>
  )
}

export default Badge
