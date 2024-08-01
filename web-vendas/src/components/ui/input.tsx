import * as React from 'react'

import { cn } from '@/lib/utils'
import { Label } from './label'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  formatter?: (value: string, name: string) => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, formatter, onChange, ...props }, ref) => {
    function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
      const { value, name } = event.target

      const formattedValue = (formatter && formatter(value, name)) || value
      console.log(formattedValue)

      event.target.value = formattedValue
    }
    return (
      <div className="grid w-full gap-2">
        {label && (
          <div className="flex items-center gap-1">
            <Label htmlFor={props.id}>{label}</Label>
            {props.required && <span>*</span>}
          </div>
        )}

        <input
          type={type}
          onChange={onInputChange}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
        <p className="h-3 text-sm text-red-500">{error && error}</p>
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
