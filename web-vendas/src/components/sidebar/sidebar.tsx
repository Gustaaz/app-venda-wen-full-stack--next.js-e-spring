import { Eye } from 'lucide-react'

import Link from 'next/link'
import { ItemsSidebar } from './items-sidebar'

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background md:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/inicio"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Eye className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">e-Vista</span>
        </Link>
        <ItemsSidebar />
      </nav>
    </aside>
  )
}
