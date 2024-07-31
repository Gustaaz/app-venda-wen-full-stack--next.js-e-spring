import { Loader } from 'lucide-react'

export default function Loading() {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-4">
      <div className="grid items-center justify-center gap-2">
        <Loader className="h-6 w-6 animate-spin" />
      </div>
    </main>
  )
}
