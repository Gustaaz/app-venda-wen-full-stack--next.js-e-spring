import Link from 'next/link'
import { PanelLeft, Eye } from 'lucide-react'
import { SheetTrigger, Button, SheetContent, Sheet } from '../ui'
import { ItemSidebarMobile } from './item-sidebar-mobile'

export function SidebarMobile() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="md:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="#"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <Eye className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">e-Vista</span>
          </Link>
          <ItemSidebarMobile />
        </nav>
      </SheetContent>
    </Sheet>
  )
}
