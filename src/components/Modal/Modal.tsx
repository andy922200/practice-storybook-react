import { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { AddPrefix } from '@/common'
import Portal from '@/components/Portal/Portal'

export interface ModelProps {
  isOpen?: boolean
  animationDuration?: number
  onClose?: () => void
  children?: React.ReactNode
  hasMask?: boolean
}

type InternalModelProps = AddPrefix<Omit<ModelProps, 'children'>>

const hideMask = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const showMask = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const Mask = styled.div<InternalModelProps>`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background: #00000080;
  z-index: 2;
  animation: ${(props) => (props.$isOpen ? showMask : hideMask)}
    ${(props) => props.$animationDuration}ms ease-in-out forwards;
`

const ModalWrapper = styled.div<InternalModelProps>`
  position: fixed;
  z-index: 3;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
`

const Modal = ({
  isOpen = false,
  onClose,
  animationDuration = 200,
  children,
  hasMask = true,
}: ModelProps) => {
  const [removeDOM, setRemoveDOM] = useState(!isOpen)

  useEffect(() => {
    if (isOpen) {
      setRemoveDOM(false)
    } else {
      setTimeout(() => {
        setRemoveDOM(true)
      }, animationDuration + 100)
    }
  }, [animationDuration, isOpen])

  return (
    !removeDOM && (
      <Portal>
        {hasMask && (
          <Mask $isOpen={isOpen} $animationDuration={animationDuration} onClick={onClose} />
        )}
        <ModalWrapper $isOpen={isOpen}>{children}</ModalWrapper>
      </Portal>
    )
  )
}

export default Modal
