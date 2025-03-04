import * as React from 'react'

import { cn } from '@/lib/utils'
import { Label } from './label'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div className="grid gap-3">
        {label && (
          <div className="flex items-center gap-1">
            <Label htmlFor={props.id}>{label}</Label>
            {props.required && <span>*</span>}
          </div>
        )}
        <textarea
          className={cn(
            'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
        {props.error && <p className="text-sm text-red-500">{props.error}</p>}
      </div>
    )
  },
)
Textarea.displayName = 'Textarea'

export { Textarea }
