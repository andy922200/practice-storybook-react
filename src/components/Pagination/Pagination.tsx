import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import styled, { css } from 'styled-components'
import { AddPrefix } from '@/common'
import { useColor } from '@/hook/useColor'
import { usePagination } from '@/hook/usePagination'

export interface PaginationProps {
  className?: string
  themeColor?: string
  page?: number
  pageSize?: number
  total?: number
  withEllipsis?: boolean
  onChange?: ({ current, pageSize }: { current: number; pageSize: number }) => void
}

type InternalPaginationProps = AddPrefix<Omit<PaginationProps, 'children'>> & {
  $isDisabled?: boolean
  $isCurrent?: boolean
  $color?: string
}

const buttonStyle = css`
  width: 32px;
  height: 32px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
  &:hover {
    color: #222;
    background: #0000000a;
    transition: background 0.2s ease-in-out;
  }
`

const disabledButtonStyle = css`
  color: #00000042;
  background: none;
  cursor: default;
  &:hover {
    color: #00000042;
    background: none;
  }
`

const StyledPagination = styled.div`
  display: flex;
  align-items: center;
  & > *:not(:first-child) {
    margin-left: 12px;
  }
`

const ArrowButton = styled.div<InternalPaginationProps>`
  ${buttonStyle}
  ${(props) => (props.$isDisabled ? disabledButtonStyle : null)}
`

const currentItemStyle = css<InternalPaginationProps>`
  background: ${(props) => props.$color};
  color: #fff;
  &:hover {
    background: ${(props) => props.$color};
    color: #fff;
    transition: background 0.2s ease-in-out;
  }
`

const StyledItem = styled.div<InternalPaginationProps>`
  ${buttonStyle}
  ${(props) => (props.$isCurrent ? currentItemStyle : null)}
`

const Pagination = ({
  themeColor,
  withEllipsis = false,
  page = 1,
  pageSize = 20,
  total,
  onChange,
}: PaginationProps) => {
  const { pickColor } = useColor()
  const color = pickColor(themeColor || '')
  const { items, totalPage, handleClickNext, handleClickPrev } = usePagination({
    page,
    pageSize,
    total,
    withEllipsis,
    onChange,
  })

  console.log(items)

  return (
    <StyledPagination>
      <ArrowButton
        role="presentation"
        onClick={page === 1 ? undefined : handleClickPrev}
        $isDisabled={page === 1}
      >
        <FaArrowLeft />
      </ArrowButton>
      {items.map((item) => {
        if (item.type === 'page') {
          return (
            <StyledItem
              key={item.page}
              $isCurrent={item.isCurrent}
              $color={color}
              onClick={item.onClick}
            >
              <span>{item.page}</span>
            </StyledItem>
          )
        }
        return <div key={item.page}>...</div>
      })}
      <ArrowButton
        role="presentation"
        onClick={page === totalPage ? undefined : handleClickNext}
        $isDisabled={page === totalPage}
      >
        <FaArrowRight />
      </ArrowButton>
    </StyledPagination>
  )
}

export default Pagination
