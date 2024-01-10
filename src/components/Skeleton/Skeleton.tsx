import { HTMLAttributes } from 'react'
import BackgroundSlide from './BackgroundSlide'
import ColorBlock from './ColorBlock'
import ColorFlashBlock from './ColorFlashBlock'

const variantMap = {
  colorBlock: ColorBlock,
  flash: ColorFlashBlock,
  slide: BackgroundSlide,
}

export enum SkeletonVariant {
  colorBlock = 'colorBlock',
  flash = 'flash',
  slide = 'slide',
}

export interface SkeletonProps {
  variant?: SkeletonVariant
}

const Skeleton = ({
  variant = SkeletonVariant.colorBlock,
  ...props
}: SkeletonProps & HTMLAttributes<HTMLDivElement>) => {
  const SkeletonComponent = variantMap[variant] || variantMap.colorBlock

  return <SkeletonComponent {...props} />
}

export default Skeleton
