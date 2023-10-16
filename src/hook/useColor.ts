import theme from '@/theme'

export const useColor = () => {
  const pickColor = (themeColor: string) => {
    const color = theme[themeColor] || themeColor || theme.primary

    return color
  }

  return { pickColor }
}
