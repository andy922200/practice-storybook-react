import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'
import { FaBluetoothB, FaDev } from 'react-icons/fa'
import Button, { ButtonVariant } from './Button'

// Story Meta
const meta: Meta<typeof Button> = {
  title: 'Input Elements/Button',
  component: Button,
  excludeStories: ['actions'],
}

export default meta

// Story Mock Actions
export const actions = {
  onClick: action('onClick'),
}

// Stories
type Story = StoryObj<typeof Button>

export const Default: Story = {
  name: 'Contained',
  args: {
    children: 'Click',
    variant: '',
    themeColor: 'primary',
    onClick: actions.onClick,
  },
}

export const Outlined: Story = {
  args: {
    ...Default.args,
    variant: ButtonVariant.outlined,
    themeColor: 'secondary',
  },
}

export const Text: Story = {
  args: {
    ...Default.args,
    children: 'Click',
    variant: ButtonVariant.text,
    themeColor: 'secondary',
  },
}

export const StartIcon: Story = {
  args: {
    ...Default.args,
    themeColor: 'secondary',
    onClick: actions.onClick,
    startIcon: <FaBluetoothB />,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [ButtonVariant.contained, ButtonVariant.outlined, ButtonVariant.text],
    },
  },
}

export const EndIcon: Story = {
  args: {
    ...Default.args,
    themeColor: '#198754',
    onClick: actions.onClick,
    endIcon: <FaDev />,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [ButtonVariant.contained, ButtonVariant.outlined, ButtonVariant.text],
    },
  },
}

export const CustomizedBtn: Story = {
  name: 'Customized Style',
  args: {
    ...Default.args,
    children: 'Click',
    variant: ButtonVariant.outlined,
    themeColor: '',
    style: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      borderRadius: 50,
    },
  },
}
