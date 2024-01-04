import {
  useCallback,
  useEffect,
  useRef,
  useState,
  cloneElement,
  isValidElement,
  Children,
  HTMLAttributes,
} from 'react'
import styled from 'styled-components'
import { TabProps } from './Tab'
import { AddPrefix } from '@/common'

export interface TabGroupProps {
  className?: string
  children?: React.ReactNode
  onChange?: (value: string) => void
  value?: string
  color?: string
}

type InternalTabGroupProps = AddPrefix<Omit<TabGroupProps, 'children'>> & {
  $left: number
  $width: number
}

const TabsScrollWrapper = styled.div`
  position: relative;
`

const Indicator = styled.div<InternalTabGroupProps>`
  position: absolute;
  bottom: 0px;
  left: ${(props) => props.$left}px;
  height: 2px;
  width: ${(props) => props.$width}px;
  background: ${(props) => props.$color};
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`

const StyledTabGroup = styled.div`
  display: flex;
`

const TabGroup = ({
  className = '',
  value = '',
  children = null,
  onChange = () => {},
  color = '',
  ...props
}: TabGroupProps) => {
  const tabGroupRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [tabAttrList, setTabAttrList] = useState<{ left: number; width: number }[]>([])

  const handleClickTab = ({ tabValue, tabIndex }: { tabValue: string; tabIndex: number }) => {
    onChange(tabValue)
    setActiveIndex(tabIndex)
  }

  const handleUpdateTabAttr = useCallback(() => {
    const tabGroupCurrent = tabGroupRef.current
    const tabNumber = Children.count(children)

    setTabAttrList(
      [...Array(tabNumber).keys()].map((tabIndex) => {
        const childElement = tabGroupCurrent?.children[tabIndex] as HTMLElement

        return {
          width: childElement.offsetWidth,
          left: childElement.offsetLeft,
        }
      }),
    )
  }, [children])

  useEffect(() => {
    handleUpdateTabAttr()
    window.addEventListener('resize', handleUpdateTabAttr)
    return () => {
      window.removeEventListener('resize', handleUpdateTabAttr)
    }
  }, [handleUpdateTabAttr])

  return (
    <TabsScrollWrapper className={className} {...props}>
      <StyledTabGroup ref={tabGroupRef} className="tab__tab-group">
        {Children.map(
          children,
          (child, tabIndex) =>
            isValidElement<TabProps & HTMLAttributes<HTMLDivElement>>(child) &&
            cloneElement(child, {
              onClick: () =>
                handleClickTab({
                  tabValue: child.props.value || '',
                  tabIndex,
                }),
              isActive: child.props.value === value,
              color,
            }),
        )}
      </StyledTabGroup>
      <Indicator
        $left={tabAttrList[activeIndex]?.left || 0}
        $width={tabAttrList[activeIndex]?.width || 0}
        $color={color}
      />
    </TabsScrollWrapper>
  )
}

export default TabGroup
