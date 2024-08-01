import { Input, InputProps } from '../ui'
import { forwardRef } from 'react'
import { FormatUtils } from '@4us-dev/utils'

const formatterUltil = new FormatUtils()
export const InputDate = forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => {
    const formaterDate = (value: string) => {
      const data = formatterUltil.formatOnlyIntegers(value)

      if (!data) {
        return ''
      }

      if (data.length <= 2) {
        return data
      }

      if (data.length <= 4) {
        return data.substring(0, 2) + '/' + data.substring(2)
      }

      if (data.length <= 6) {
        return (
          data.substring(0, 2) +
          '/' +
          data.substring(2, 4) +
          '/' +
          data.substring(4)
        )
      }
    }

    return (
      <Input {...props} formatter={formaterDate} ref={ref} maxLength={10} />
    )
  },
)
