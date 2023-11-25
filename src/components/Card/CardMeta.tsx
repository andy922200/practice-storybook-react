import { HTMLAttributes } from 'react'
import styled from 'styled-components'

export interface CardMetaProps {
  className?: string
  avatarUrl?: string
  title?: string
  description?: string
}

const StyledMeta = styled.div`
  padding: 12px 16px;
  display: flex;
  & > *:not(:first-child) {
    margin-left: 8px;
  }
`

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  & > img {
    width: 100%;
  }
`

const Content = styled.div`
  .meta__title {
    overflow: hidden;
    color: #000000d9;
    font-weight: 500;
    font-size: 16px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .meta__description {
    font-size: 14px;
    color: #00000073;
  }
`

const Meta = ({
  className,
  avatarUrl,
  title,
  description,
}: CardMetaProps & HTMLAttributes<HTMLDivElement>) => (
  <StyledMeta className={className}>
    <Avatar>
      <img src={avatarUrl} alt="" style={{ objectFit: 'cover' }} />
    </Avatar>
    <Content>
      <div className="meta__title">{title}</div>
      <div className="meta__description">{description}</div>
    </Content>
  </StyledMeta>
)

export default Meta
