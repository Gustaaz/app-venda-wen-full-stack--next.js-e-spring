import { maskPrice } from '@/ultls/mask-price'
import { Input, InputProps } from '../ui'
import { forwardRef } from 'react'

const InputMoney = forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => {
    return (
      <Input
        {...props}
        formatter={maskPrice}
        ref={ref}
        defaultValue={'0,00'}
        maxLength={16}
      />
    )
  },
)

InputMoney.displayName = 'InputMoney'

export { InputMoney }
