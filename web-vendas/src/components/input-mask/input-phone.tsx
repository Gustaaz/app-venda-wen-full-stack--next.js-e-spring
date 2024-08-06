import { Input, InputProps } from '../ui'
import { forwardRef } from 'react'
import { FormatUtils } from '@4us-dev/utils'

const formatterUltil = new FormatUtils()

const InputPhone = forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => {
    return <Input {...props} formatter={formatterUltil.formatPhone} ref={ref} />
  },
)

InputPhone.displayName = 'InputPhone'

export { InputPhone }
