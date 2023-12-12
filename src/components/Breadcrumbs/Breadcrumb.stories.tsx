import type { Meta, StoryObj } from '@storybook/react'
import { BiHome, BiBusSchool, BiUser, BiAlarm } from 'react-icons/bi'
import Breadcrumbs from './Breadcrumbs'

// Story Meta
const meta: Meta<typeof Breadcrumbs> = {
  title: 'Navigation Elements/Breadcrumbs',
  component: Breadcrumbs,
  excludeStories: ['actions'],
}

export default meta

// Stories
type Story = StoryObj<typeof Breadcrumbs>

const routes = [
  {
    to: '/home',
    label: '首頁',
  },
  {
    to: '/school',
    label: '學校列表',
  },
  {
    to: '/members',
    label: '會員列表',
  },
  {
    to: '/memberDetail',
    label: '會員資料',
  },
]

const routesWithIcon = [
  {
    to: '/home',
    label: '首頁',
    icon: <BiHome />,
  },
  {
    to: '/school',
    label: '學校列表',
    icon: <BiBusSchool />,
  },
  {
    to: '/members',
    label: '會員列表',
    icon: <BiUser />,
  },
  {
    to: '/memberDetail',
    label: '會員資料',
    icon: <BiAlarm />,
  },
]

export const Default: Story = {
  args: {
    maxItems: 5,
    separator: '>',
  },
  render: (args) => (
    <Breadcrumbs {...args}>
      {routes.map((route) => (
        <a href={route.to} key={route.label}>
          {route.label}
        </a>
      ))}
    </Breadcrumbs>
  ),
}

export const WithIcon: Story = {
  args: {
    maxItems: 2,
    separator: '>',
  },
  render: (args) => (
    <Breadcrumbs {...args}>
      {routesWithIcon.map((route) => (
        <a href={route.to} key={route.label}>
          {route.icon}
          <span>{route.label}</span>
        </a>
      ))}
    </Breadcrumbs>
  ),
}
