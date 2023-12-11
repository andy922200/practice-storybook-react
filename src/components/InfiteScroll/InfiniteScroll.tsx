import { ReactNode, useRef, useEffect } from 'react'
import { FaSpinner } from 'react-icons/fa'
import styled from 'styled-components'
import { AddPrefix } from '@/common'

export interface InfiniteScrollProps {
  height?: number
  isLoading?: boolean
  onScrollBottom?: (...args: any[]) => any
  children?: ReactNode
}

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
`

const InfiniteScrollWrapper = styled.div<InternalInfiniteScrollProps>`
  height: ${(props) => props.$height}px;
  overflow: auto;
`

type InternalInfiniteScrollProps = AddPrefix<Omit<InfiniteScrollProps, 'children'>> & {
  $height?: number
}

const InfiniteListenOnScroll = ({
  height,
  onScrollBottom,
  isLoading,
  children,
}: InfiniteScrollProps) => {
  const infiniteScrollRef = useRef<HTMLDivElement>(null)

  const handleOnScroll = () => {
    const containerElem = infiniteScrollRef.current
    if (containerElem) {
      const scrollPos = containerElem.scrollTop + containerElem.clientHeight
      const divHeight = containerElem.scrollHeight

      // 滾過的距離加上自己元素的高度，大於等於可滾動範圍的高度
      if (scrollPos >= divHeight && onScrollBottom) {
        onScrollBottom()
      }
    }
  }

  return (
    <InfiniteScrollWrapper ref={infiniteScrollRef} $height={height} onScroll={handleOnScroll}>
      {children}
      {isLoading && (
        <Loading>
          <FaSpinner />
        </Loading>
      )}
    </InfiniteScrollWrapper>
  )
}

const InfiniteScrollObserver = ({ onScrollBottom, children }: InfiniteScrollProps) => {
  const loadingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadingElem = loadingRef.current
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && onScrollBottom) {
          onScrollBottom()
        }
      },
      {
        threshold: 0.8,
      },
    )
    if (loadingElem) {
      intersectionObserver.observe(loadingElem)
    }
    return () => {
      if (loadingElem) {
        intersectionObserver.unobserve(loadingElem)
      }
    }
  }, [onScrollBottom])

  return (
    <InfiniteScrollWrapper>
      {children}
      <Loading ref={loadingRef}>
        <FaSpinner />
      </Loading>
    </InfiniteScrollWrapper>
  )
}

export { InfiniteListenOnScroll, InfiniteScrollObserver }
