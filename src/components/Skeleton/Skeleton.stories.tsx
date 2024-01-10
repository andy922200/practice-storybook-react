import type { Meta, StoryObj } from '@storybook/react'
import { HTMLAttributes } from 'react'
import styled from 'styled-components'
import Skeleton, { SkeletonProps, SkeletonVariant } from './Skeleton'

// Story Meta
const meta: Meta<typeof Skeleton> = {
  title: 'Feedback Elements/Skeleton',
  component: Skeleton,
  excludeStories: ['actions'],
}

export default meta

// Stories
type Story = StoryObj<typeof Skeleton>

const SkeletonWrapper = styled.div`
  display: flex;
  align-items: center;
  & > *:not(:first-child) {
    margin-left: 16px;
  }
`

const TextLineWrapper = styled.div`
  & > *:not(:first-child) {
    margin-top: 12px;
  }
`

const TextLine = ({ style, ...props }: SkeletonProps & HTMLAttributes<HTMLDivElement>) => (
  <Skeleton style={{ width: 50, height: 20, ...style }} {...props} />
)

export const Default: Story = {
  args: {
    variant: SkeletonVariant.colorBlock,
  },
  render: ({ variant }) => (
    <SkeletonWrapper>
      <TextLineWrapper>
        <TextLine variant={variant || SkeletonVariant.colorBlock} style={{ width: 300 }} />
        <TextLine variant={variant || SkeletonVariant.colorBlock} style={{ width: 230 }} />
      </TextLineWrapper>
    </SkeletonWrapper>
  ),
}
