import { useRef, useState, useCallback, useEffect, HTMLAttributes } from 'react'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'
import styled from 'styled-components'
import { AddPrefix } from '@/common'

export interface CarouselProps {
  className?: string
  dataSource?: string[]
  hasDots?: boolean
  hasControlArrow?: boolean
  autoplay?: boolean
  autoplaySpeed?: number
  imgWidth?: number
  imgHeight?: number
}

type InternalCarouselProps = AddPrefix<Omit<CarouselProps, 'children'>> & {
  $width?: number
  $height?: number
  $left?: number
  $isCurrent?: boolean
}

const CarouselWrapper = styled.div<InternalCarouselProps>`
  position: relative;
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
`

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  background: black;
`

const Image = styled.img<InternalCarouselProps>`
  width: 100%;
  position: absolute;
  left: ${(props) => props.$left}px;
  transition: all 0.4s ease;
  object-fit: cover;
`

const ControlButtons = styled.div`
  color: white;
  position: absolute;
  z-index: 10;
  left: 0px;
  top: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  & > svg {
    cursor: pointer;
    width: 40px;
    height: 40px;
  }
`

const Dots = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  left: 50%;
  bottom: 8px;
  transform: translateX(-50%);
  & > *:not(:first-child) {
    margin-left: 6px;
  }
`

const Dot = styled.div<InternalCarouselProps>`
  border-radius: 100%;
  width: ${(props) => (props.$isCurrent ? 10 : 8)}px;
  height: ${(props) => (props.$isCurrent ? 10 : 8)}px;
  border: 1px solid #fff;
  background: ${(props) => (props.$isCurrent ? '#FFF' : 'none')};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`

const Carousel = ({
  className,
  dataSource,
  hasDots,
  hasControlArrow,
  autoplay,
  autoplaySpeed = 3000,
  imgWidth = 600,
  imgHeight = 600,
}: CarouselProps & HTMLAttributes<HTMLDivElement>) => {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [internalImageWidth, setInternalImageWidth] = useState(imgWidth)
  const getIndexes = () => {
    const prevIndex = Array.isArray(dataSource)
      ? currentIndex - 1 < 0
        ? dataSource.length - 1
        : currentIndex - 1
      : 0
    const nextIndex = Array.isArray(dataSource) ? (currentIndex + 1) % dataSource.length : 0

    return {
      prevIndex,
      nextIndex,
    }
  }

  const makePosition = ({ itemIndex }: { itemIndex: number }) =>
    (itemIndex - currentIndex) * internalImageWidth

  const handleClickPrev = () => {
    const { prevIndex } = getIndexes()
    setCurrentIndex(prevIndex)
  }

  const handleClickNext = useCallback(() => {
    const { nextIndex } = getIndexes()
    setCurrentIndex(nextIndex)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex])

  const handleUpdateCarouselWidth = () => {
    const carouselWidth = carouselRef?.current?.clientWidth || 0
    setInternalImageWidth(carouselWidth)
  }

  useEffect(() => {
    handleUpdateCarouselWidth()
    window.addEventListener('resize', handleUpdateCarouselWidth)
    return () => {
      window.removeEventListener('resize', handleUpdateCarouselWidth)
    }
  }, [])

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined = undefined
    if (autoplay) {
      intervalId = setInterval(() => {
        handleClickNext()
      }, autoplaySpeed)
    }
    return () => {
      clearInterval(intervalId)
    }
  }, [autoplay, autoplaySpeed, handleClickNext])

  return (
    <CarouselWrapper
      ref={carouselRef}
      className={className}
      $width={internalImageWidth}
      $height={imgHeight}
    >
      <ImageWrapper>
        {dataSource?.map((imageUrl, index) => (
          <Image key={imageUrl} src={imageUrl} alt="" $left={makePosition({ itemIndex: index })} />
        ))}
      </ImageWrapper>
      {hasControlArrow && (
        <ControlButtons>
          <BiLeftArrowAlt onClick={handleClickPrev} />
          <BiRightArrowAlt onClick={handleClickNext} />
        </ControlButtons>
      )}
      {hasDots && (
        <Dots>
          {[...Array(dataSource?.length).keys()].map((key, index) => (
            <Dot
              key={key}
              $isCurrent={index === currentIndex}
              onClick={() => setCurrentIndex(key)}
            />
          ))}
        </Dots>
      )}
    </CarouselWrapper>
  )
}

export default Carousel
