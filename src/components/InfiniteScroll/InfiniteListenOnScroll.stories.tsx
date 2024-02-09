import type { Meta, StoryObj } from '@storybook/react'
import { useState, useEffect } from 'react'
import { InfiniteListenOnScroll, InfiniteScrollObserver } from './InfiniteScroll'

// Story Meta
const meta: Meta<typeof InfiniteListenOnScroll> = {
  title: 'Data Display Elements/InfiniteListenOnScroll',
  component: InfiniteListenOnScroll,
  excludeStories: ['actions'],
}

export default meta

// Stories
type Story = StoryObj<typeof InfiniteListenOnScroll>

const HookInfiniteListenOnScroll = () => {
  const [dataSource, setDataSource] = useState<Record<string, any>[]>([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [, setErrorMeg] = useState('')
  const limit = 10

  const fetchData = async (page: number) => {
    setIsLoading(true)
    try {
      const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
      const data = await response.json()

      setDataSource((prev) => [...prev, ...data])
    } catch {
      setErrorMeg('api error')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData(page)
  }, [page])

  return (
    <div style={{ height: 500 }}>
      <InfiniteListenOnScroll
        height={250}
        isLoading={isLoading}
        onScrollBottom={() => {
          if (!isLoading) {
            setPage((prev) => prev + 1)
          }
        }}
      >
        <ol>
          {dataSource.map(({ id, author }) => (
            <li key={id}>Author: {author}</li>
          ))}
        </ol>
      </InfiniteListenOnScroll>
    </div>
  )
}

const HookInfiniteScrollObserver = () => {
  const [dataSource, setDataSource] = useState<Record<string, any>[]>([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [, setErrorMeg] = useState('')
  const limit = 10

  const fetchData = async (page: number) => {
    setIsLoading(true)
    try {
      const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
      const data = await response.json()

      setDataSource((prev) => [...prev, ...data])
    } catch {
      setErrorMeg('api error')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData(page)
  }, [page])

  return (
    <div style={{ height: 500 }}>
      <InfiniteScrollObserver
        onScrollBottom={() => {
          if (!isLoading) {
            setPage((prev) => prev + 1)
          }
        }}
      >
        <ol>
          {dataSource.map(({ id, author }) => (
            <li key={id}>Author: {author}</li>
          ))}
        </ol>
      </InfiniteScrollObserver>
    </div>
  )
}

export const Default: Story = {
  args: {
    height: 300,
    isLoading: false,
    onScrollBottom: () => {},
  },
  render: () => <HookInfiniteListenOnScroll />,
}

export const Observer: Story = {
  args: {
    onScrollBottom: () => {},
  },
  render: () => <HookInfiniteScrollObserver />,
}
