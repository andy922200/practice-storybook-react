import { ReactNode, HTMLAttributes } from 'react'
import styled, { css } from 'styled-components'
import { AddPrefix } from '@/common'

interface TableObj {
  key: string
  [key: string]: ReactNode
}

export interface ColumnProp {
  key?: string
  title?: string
  dataIndex?: string
  width?: string | number
  align?: 'left' | 'center' | 'right'
  fixed?: boolean
  render?: (value: TableObj) => ReactNode
}

export interface TableProps<T extends TableObj> {
  className?: string
  columns?: ColumnProp[]
  dataSource?: T[]
  maxWidth?: string | number
}

type InternalTableProps = AddPrefix<Omit<TableProps<TableObj>, 'children'>> & {
  $columnsCount?: number
}
type InternalColumnProp = AddPrefix<Omit<ColumnProp, 'children'>>

const stickyLeftStyle = css`
  position: sticky;
  left: 0px;
  z-index: 2;
  &:after {
    content: '';
    position: absolute;
    right: 0px;
    top: 0px;
    width: 30px;
    height: 100%;
    box-shadow: inset 10px 0 8px -8px #00000026;
    transform: translateX(100%);
  }
`

const StyledTable = styled.table<InternalTableProps>`
  border-collapse: collapse;
  * {
    box-sizing: border-box;
  }
  table,
  th,
  td {
    border: 1px solid #000;
  }
`

const Th = styled.th<InternalColumnProp>`
  width: ${(props) => props.$width}px;
  ${(props) => props.$fixed && stickyLeftStyle};
`

const Td = styled.td<InternalColumnProp>`
  background: #fff;
  ${(props) => props.$fixed && stickyLeftStyle};
`

const Table = ({
  className,
  columns,
  dataSource,
  maxWidth,
}: TableProps<TableObj> & HTMLAttributes<HTMLTableElement>) => (
  <div style={{ width: '100%', overflow: 'auto', maxWidth: maxWidth }}>
    <StyledTable className={className} $columnsCount={columns?.length}>
      <thead>
        <tr>
          {columns?.map((column) => (
            <Th key={column.key} $width={column.width} $fixed={column.fixed}>
              {column.title}
            </Th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataSource?.map((data) => (
          <tr key={data.key}>
            {columns?.map((column) => (
              <Td key={column.key} $width={column.width} $fixed={column.fixed}>
                {column.render
                  ? column.render(data)
                  : column.dataIndex
                  ? data[column.dataIndex]
                  : undefined}
              </Td>
            ))}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  </div>
)

export default Table
