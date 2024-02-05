import { ReactElement, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { MdCheck, MdInfo, MdOutlineWarningAmber, MdError } from 'react-icons/md'
import styled, { keyframes } from 'styled-components'
import { AddPrefix } from '@/common'

export enum ToastType {
  success = 'success',
  error = 'error',
  warning = 'warning',
  info = 'info',
}

export interface ToastProps {
  type?: ToastType
  content?: ReactElement | string
  duration?: number
}

type InternalToastProps = AddPrefix<Omit<ToastProps, 'children'>> & {
  $isVisible?: boolean
  $color?: string
}

const rootId = 'toast-root'
const renderToastContainer = () => {
  let toastRoot: HTMLElement | null = null
  let toastContainer: HTMLElement | null = null
  if (document.getElementById(rootId)) {
    toastRoot = document.getElementById(rootId)
  } else {
    const divDOM = document.createElement('div')
    divDOM.id = rootId
    document.body.appendChild(divDOM)
    toastRoot = divDOM
  }

  if (toastRoot?.firstChild) {
    toastContainer = toastRoot.firstChild as HTMLElement
  } else {
    const divDOM = document.createElement('div')
    toastRoot?.appendChild(divDOM)
    toastContainer = divDOM
  }
  const divDOM = document.createElement('div')
  toastContainer.appendChild(divDOM)

  if (!toastRoot || !toastContainer) return divDOM

  toastRoot.style.cssText = `
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
  `

  toastContainer.style.cssText = `
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
  `

  return divDOM
}

const iconMap: Record<ToastType, ReactElement> = {
  success: <MdCheck />,
  info: <MdInfo />,
  warning: <MdOutlineWarningAmber />,
  error: <MdError />,
}

const getColor = (type?: ToastType) => {
  if (type === 'success') {
    return '#52c41a'
  }
  if (type === 'info') {
    return '#1890ff'
  }
  if (type === 'warning') {
    return '#faad14'
  }
  if (type === 'error') {
    return '#d9363e'
  }
  return '#1890ff'
}

const topIn = keyframes`
  0% {
    transform: translateY(-50%);
    opacity: 0;
  }
  100% {
    transform: translateY(100%);
    opacity: 1;
  }
`

const topOut = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 1;
  }
  100% {
    transform: translateY(-50%);
    opacity: 0;
  }
`

const ToastWrapper = styled.div<InternalToastProps>`
  display: inline-flex;
  align-items: center;
  margin-top: 20px;
  box-shadow:
    0 3px 6px -4px #0000001f,
    0 6px 16px #00000014,
    0 9px 28px 8px #0000000d;
  min-width: 300px;
  min-height: 52px;
  box-sizing: border-box;
  padding: 16px 20px;
  border-radius: 4px;
  background: #fff;
  & > *:first-child {
    margin-right: 12px;
  }
  animation: ${(props) => (props.$isVisible ? topIn : topOut)} 200ms ease-in-out forwards;
`

const Icon = styled.div<InternalToastProps>`
  width: 24px;
  height: 24px;
  color: ${(prop) => prop.$color};
`

export const message = {
  success: (props: ToastProps) => {
    createRoot(renderToastContainer()).render(<Toast {...props} type={ToastType.success} />)
  },
  info: (props: ToastProps) => {
    createRoot(renderToastContainer()).render(<Toast {...props} type={ToastType.info} />)
  },
  warning: (props: ToastProps) => {
    createRoot(renderToastContainer()).render(<Toast {...props} type={ToastType.warning} />)
  },
  error: (props: ToastProps) => {
    createRoot(renderToastContainer()).render(<Toast {...props} type={ToastType.error} />)
  },
}

const Toast = ({ type = ToastType.info, content, duration = 3000 }: ToastProps) => {
  const toastRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)
  const color = getColor(type)

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false)
    }, duration)
    setTimeout(() => {
      const currentDOM = toastRef.current
      const parentDOM = currentDOM?.parentElement

      if (!parentDOM) return
      parentDOM?.parentElement?.removeChild(parentDOM)
    }, duration + 200)
  }, [duration])

  return (
    <ToastWrapper ref={toastRef} $isVisible={isVisible}>
      <Icon $color={color}>{iconMap[type]}</Icon>
      {content}
    </ToastWrapper>
  )
}

export default Toast
