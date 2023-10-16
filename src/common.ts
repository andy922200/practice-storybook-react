export type AddPrefix<T> = {
  [K in keyof T as `$${string & K}`]: T[K]
}

export enum Size {
  small = 'sm',
  medium = 'md',
  large = 'lg',
}
