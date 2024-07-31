import { SidebarMobile } from '../sidebar-mobile'
import { Breadcrumb } from './breadcrumb'
import { Avatar } from '../avatar'
import { ModeToggle } from '../theme-provider'

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 md:bg-transparent lg:static lg:h-auto lg:border-0 lg:px-6">
      <SidebarMobile />
      <div className="flex w-full items-center justify-between">
        <Breadcrumb />
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Avatar />
        </div>
      </div>
    </header>
  )
}
