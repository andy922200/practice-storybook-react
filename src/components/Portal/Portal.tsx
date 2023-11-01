import { useEffect } from 'react'
import ReactDOM from 'react-dom'

interface PortalProps {
  children: React.ReactNode
  rootId?: string
}

const Portal = ({ children, rootId = 'portal-root' }: PortalProps) => {
  let portalRoot: HTMLElement | null = null

  if (document.getElementById(rootId)) {
    portalRoot = document.getElementById(rootId)
  } else {
    const divDOM = document.createElement('div')
    divDOM.id = rootId
    document.body.appendChild(divDOM)
    portalRoot = divDOM
  }

  useEffect(
    () => () => {
      portalRoot?.parentElement?.removeChild(portalRoot)
    },
    [portalRoot],
  )

  if (!portalRoot) return null
  return ReactDOM.createPortal(children, portalRoot)
}

export default Portal
