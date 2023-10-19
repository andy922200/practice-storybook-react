import { HTMLAttributes } from 'react'
import Option, { OptionProps } from '../Option/Option'

const Checkbox = (props: OptionProps & HTMLAttributes<HTMLDivElement>) => <Option {...props} />

export default Checkbox
