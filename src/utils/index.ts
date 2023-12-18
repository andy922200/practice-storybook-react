export const findAttributeInEvent = (event: Event, attr: string): string | null => {
  const end = event.currentTarget as HTMLElement

  let temp: HTMLElement | null = event.target as HTMLElement
  let dataId: string | null = temp.getAttribute(attr)

  while (temp !== end && !dataId) {
    temp = temp.parentElement
    if (temp === null) {
      break
    }
    dataId = temp.getAttribute(attr)
  }
  return dataId
}
