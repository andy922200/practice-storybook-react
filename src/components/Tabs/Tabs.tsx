import Tab from './Tab'
import TabGroup from './TabGroup'
import { useColor } from '@/hook/useColor'

export interface TabsProps {
  className?: string
  themeColor?: string
  options?: { label: string; value: string }[]
  value?: string
  onChange?: (value: string) => void
}

const Tabs = ({ className, themeColor, value, options, onChange }: TabsProps) => {
  const { pickColor } = useColor()
  const color = pickColor(themeColor || '')

  return (
    <TabGroup className={className} onChange={onChange} value={value} color={color}>
      {options?.map((option) => (
        <Tab key={option.value} label={option.label} value={option.value} />
      ))}
    </TabGroup>
  )
}

export default Tabs
