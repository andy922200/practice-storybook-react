import { HTMLAttributes } from 'react'
import styled from 'styled-components'

const StyledColorBlock = styled.div`
  width: 12px;
  height: 12px;
  background: #eee;
`

const ColorBlock = (props: HTMLAttributes<HTMLDivElement>) => <StyledColorBlock {...props} />

export default ColorBlock
