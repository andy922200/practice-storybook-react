import type { Meta, StoryObj } from '@storybook/react'
import { ImSpinner } from 'react-icons/im'
import styled, { keyframes } from 'styled-components'
import Spin from './Spin'

// Story Meta
const meta: Meta<typeof Spin> = {
  title: 'Feedback Elements/Spin',
  component: Spin,
  excludeStories: ['actions'],
}

export default meta

// Stories
type Story = StoryObj<typeof Spin>

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const RotateContainer = styled.div<{ isLoading: boolean }>`
  animation: ${(props) => (props.isLoading ? rotateAnimation : 'none')} 1000ms linear infinite;
`

const MockContent = styled.div`
  max-width: 500px;
  padding: 20px;
  max-height: 500px;
  overflow-y: auto;
  border: 1px solid #b9b9b9;
`

export const Default: Story = {
  args: {
    isLoading: true,
    themeColor: '',
  },
  render: ({ isLoading, themeColor }) => (
    <Spin
      isLoading={isLoading || false}
      themeColor={themeColor}
      indicator={
        <RotateContainer isLoading={isLoading || false}>
          <ImSpinner />
        </RotateContainer>
      }
    />
  ),
}

export const WithMockContent: Story = {
  args: {
    isLoading: true,
    themeColor: '',
  },
  render: ({ isLoading, themeColor }) => (
    <Spin
      isLoading={isLoading || false}
      themeColor={themeColor}
      indicator={
        <RotateContainer isLoading={isLoading || false}>
          <ImSpinner />
        </RotateContainer>
      }
    >
      <MockContent>
        <h1>Lorem Ipsum</h1>
        <p>
          Why do we use it? It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of using Lorem Ipsum is
          that it has a more-or-less normal distribution of letters, as opposed to using Content
          here, content here, making it look like readable English. Many desktop publishing packages
          and web page editors now use Lorem Ipsum as their default model text, and a search for
          lorem ipsum will uncover many web sites still in their infancy. Various versions have
          evolved over the years, sometimes by accident, sometimes on purpose (injected humour and
          the like).
        </p>
        <p>
          Why do we use it? It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of using Lorem Ipsum is
          that it has a more-or-less normal distribution of letters, as opposed to using Content
          here, content here, making it look like readable English. Many desktop publishing packages
          and web page editors now use Lorem Ipsum as their default model text, and a search for
          lorem ipsum will uncover many web sites still in their infancy. Various versions have
          evolved over the years, sometimes by accident, sometimes on purpose (injected humour and
          the like).
        </p>
        <p>
          Why do we use it? It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of using Lorem Ipsum is
          that it has a more-or-less normal distribution of letters, as opposed to using Content
          here, content here, making it look like readable English. Many desktop publishing packages
          and web page editors now use Lorem Ipsum as their default model text, and a search for
          lorem ipsum will uncover many web sites still in their infancy. Various versions have
          evolved over the years, sometimes by accident, sometimes on purpose (injected humour and
          the like).
        </p>
      </MockContent>
    </Spin>
  ),
}
