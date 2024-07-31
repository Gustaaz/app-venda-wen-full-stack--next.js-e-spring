'use client'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui'
import { useActiveMenu } from '@/hooks/use-active-menu'
import { itemsSidebars } from '@/ultls/items-sidebar'
import { Icon } from '../icon-lucide'
import Link from 'next/link'

export function ItemsSidebar() {
  const { isActive } = useActiveMenu()

  const getActiveClass = (itemName: string) => {
    return isActive(itemName) && 'bg-accent'
  }
  return (
    <>
      {itemsSidebars.map((item) => (
        <TooltipProvider key={item.name}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={item.href}
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${getActiveClass(
                  item.name,
                )}`}
              >
                <Icon name={item.icon} className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{item.name}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </>
  )
}
