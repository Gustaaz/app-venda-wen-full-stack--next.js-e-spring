'use client'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui'

type BackButtonProps = {
  label?: string
}

export function BackButton({ label }: BackButtonProps) {
  const { back } = useRouter()
  return (
    <div className="flex items-center gap-4">
      <Button
        type="button"
        onClick={() => back()}
        variant="outline"
        size="icon"
        className="h-7 w-7"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Back</span>
      </Button>
      {label && (
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          {label}
        </h1>
      )}
    </div>
  )
}
