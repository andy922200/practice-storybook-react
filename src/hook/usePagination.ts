import { PaginationProps } from '@/components/Pagination/Pagination'

export const usePagination = ({
  page = 1,
  pageSize = 20,
  total = 0,
  withEllipsis,
  onChange,
}: PaginationProps) => {
  const totalPage = Math.ceil(total / pageSize)
  const items = [...Array(totalPage).keys()]
    .map((key) => key + 1)
    .map((item) => ({
      type: 'page',
      isCurrent: page === item,
      page: item,
      onClick: () => {
        if (onChange) {
          onChange({ current: item, pageSize })
        }
      },
    }))
  const markedItems = items.map((item) => {
    if (
      item.page === totalPage ||
      item.page === 1 ||
      item.page === page ||
      item.page === page + 1 ||
      item.page === page - 1
    ) {
      return item
    }
    return {
      ...item,
      type: item.page > page ? 'end-ellipsis' : 'start-ellipsis',
    }
  })
  const ellipsisItems = markedItems.filter((item, index) => {
    if (item.type === 'start-ellipsis' && markedItems[index + 1].type === 'start-ellipsis') {
      return false
    }
    if (item.type === 'end-ellipsis' && markedItems[index + 1].type === 'end-ellipsis') {
      return false
    }
    return true
  })

  const handleClickNext = () => {
    const nextCurrent = page + 1 > totalPage ? totalPage : page + 1
    if (onChange) {
      onChange({ current: nextCurrent, pageSize })
    }
  }

  const handleClickPrev = () => {
    const prevCurrent = page - 1 < 1 ? 1 : page - 1
    if (onChange) {
      onChange({ current: prevCurrent, pageSize })
    }
  }

  return {
    items: withEllipsis ? ellipsisItems : items,
    totalPage,
    handleClickNext,
    handleClickPrev,
  }
}

export default { usePagination }
