import { ReactNode, HTMLAttributes, useState, useEffect, useCallback } from 'react'
import { FaStar } from 'react-icons/fa'
import styled from 'styled-components'
import { AddPrefix } from '@/common'
import { useColor } from '@/hook/useColor'

export interface RateProps {
  count?: number
  character?: ReactNode
  size?: number
  themeColor?: string
  isDisabled?: boolean
  allowHalf?: boolean
  onChange?: (value: number) => void
}

type InternalRateProps = AddPrefix<Omit<RateProps, 'children'>> & {
  $isActive?: boolean
  $isString?: boolean
  $starColor?: string
}

const RateWrapper = styled.div<InternalRateProps>`
  display: inline-flex;
  ${(props) => (props.$isString ? `font-size: ${props.$size}px;` : null)}

  .rate__character-first, .rate__character-second {
    ${(props) => (props.$isString ? null : `height: ${props.$size}px;`)}
    & > * {
      width: ${(props) => props.$size}px;
      height: ${(props) => props.$size}px;
    }
  }

  .rate__character-first {
    ${(props) => (props.$allowHalf ? null : 'display: none;')}
  }
`

const CharacterWrapper = styled.div`
  position: relative;
`

const CharacterFirst = styled.div<InternalRateProps>`
  position: absolute;
  color: ${(props) => (props.$isActive ? props.$starColor : '#F0F0F0')};
  width: 50%;
  overflow: hidden;
  cursor: ${(props) => (props.$isDisabled ? 'not-allowed' : 'pointer')};
`

const CharacterSecond = styled.div<InternalRateProps>`
  color: ${(props) => (props.$isActive ? props.$starColor : '#F0F0F0')};
  cursor: ${(props) => (props.$isDisabled ? 'not-allowed' : 'pointer')};
`

const Rate = ({
  count = 5,
  defaultValue = 0,
  character = <FaStar />,
  themeColor,
  size = 24,
  allowHalf,
  isDisabled,
  onChange,
}: RateProps & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>) => {
  const [innerValue, setInnerValue] = useState<number>(
    typeof defaultValue === 'number' ? defaultValue : 0,
  )
  const [previewValue, setPreviewValue] = useState(innerValue)
  const isString = typeof character === 'string'
  const { pickColor } = useColor()
  const starColor = pickColor(themeColor || '')

  const handleOnClick = (clickedValue: number) => {
    if (isDisabled) return
    setInnerValue((previousValue) => (previousValue === clickedValue ? 0 : clickedValue))
  }

  const handleChangePreviewValue = useCallback(
    (currentValue: number) => {
      if (!isDisabled) {
        setPreviewValue(currentValue)
      }
    },
    [isDisabled],
  )

  useEffect(() => {
    if (typeof onChange === 'function') {
      onChange(innerValue)
    }
  }, [innerValue, onChange])

  return (
    <RateWrapper $size={size} $allowHalf={allowHalf} $isString={isString}>
      {[...Array(count).keys()].map((itemKey) => (
        <CharacterWrapper key={itemKey}>
          <CharacterFirst
            className="rate__character-first"
            $starColor={starColor}
            $isActive={itemKey + 0.5 <= Number(previewValue)}
            $isDisabled={isDisabled}
            onMouseOver={() => handleChangePreviewValue(itemKey + 0.5)}
            onMouseLeave={() => handleChangePreviewValue(innerValue)}
            onClick={() => handleOnClick(itemKey + 0.5)}
          >
            {character}
          </CharacterFirst>
          <CharacterSecond
            className="rate__character-second"
            $starColor={starColor}
            $isActive={itemKey + 1 <= Number(previewValue)}
            $isDisabled={isDisabled}
            onMouseOver={() => handleChangePreviewValue(itemKey + 1)}
            onMouseLeave={() => handleChangePreviewValue(innerValue)}
            onClick={() => handleOnClick(itemKey + 1)}
          >
            {character}
          </CharacterSecond>
        </CharacterWrapper>
      ))}
    </RateWrapper>
  )
}

export default Rate
