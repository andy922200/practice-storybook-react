import type { Meta, StoryObj } from '@storybook/react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import ProgressBar, { ProgressBarProps } from './ProgressBar'

// Story Meta
const meta: Meta<typeof ProgressBar> = {
  title: 'Feedback Elements/ProgressBar',
  component: ProgressBar,
  excludeStories: ['actions'],
}

export default meta

// Stories
type Story = StoryObj<typeof ProgressBar>

export const Default: Story = {
  args: {
    value: 1,
    themeColor: '',
    showInfo: true,
    isStatusActive: false,
  },
}

const GradientProgressBar = styled(ProgressBar)`
  .progress-bar__track {
    background: linear-gradient(45deg, #ff8e53 30%, #fe6b8b 90%);
  }
`

export const Gradient: Story = {
  args: {
    value: 1,
    showInfo: true,
    isStatusActive: false,
  },
  render: ({ value, showInfo, isStatusActive }) => {
    return <GradientProgressBar value={value} showInfo={showInfo} isStatusActive={isStatusActive} />
  },
}

const TransitionHook = ({ showInfo, isStatusActive, themeColor }: ProgressBarProps) => {
  const [playKey, setPlayKey] = useState(true)
  const [transitionValue, setTransitionValue] = useState(0)

  useEffect(() => {
    let intervalId: NodeJS.Timeout | number = -1
    setTransitionValue(0)
    if (playKey) {
      setPlayKey(false)
      intervalId = setInterval(() => {
        setTransitionValue((prev) => {
          if (prev >= 105) {
            clearInterval(intervalId)
          }
          return prev + 1
        })
      }, 100)
    }
  }, [playKey])

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
        <button onClick={() => setPlayKey(true)}> Replay </button>
      </div>
      <ProgressBar
        value={transitionValue < 100 ? transitionValue : 100}
        showInfo={showInfo}
        isStatusActive={isStatusActive}
        themeColor={themeColor}
      />
    </div>
  )
}

export const Transition: Story = {
  args: {
    showInfo: true,
    isStatusActive: false,
    themeColor: '',
  },
  render: ({ showInfo, isStatusActive, themeColor }) => {
    return (
      <TransitionHook showInfo={showInfo} isStatusActive={isStatusActive} themeColor={themeColor} />
    )
  },
}
