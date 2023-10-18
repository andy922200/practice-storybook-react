import { HTMLAttributes } from 'react'
import Option, { OptionProps } from '../Option/Option'

const Radio = (props: OptionProps & HTMLAttributes<HTMLDivElement>) => <Option isRadio {...props} />

export default Radio
