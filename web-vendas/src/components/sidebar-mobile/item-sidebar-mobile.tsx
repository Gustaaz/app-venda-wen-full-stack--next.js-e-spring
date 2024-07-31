'use client'
import Link from 'next/link'
import { itemsSidebars } from '@/ultls/items-sidebar'
import { Icon } from '../icon-lucide'
import { useActiveMenu } from '@/hooks/use-active-menu'

export function ItemSidebarMobile() {
  const { isActive } = useActiveMenu()

  const getActiveClass = (itemName: string) => {
    return (
      (isActive(itemName) && ' text-foreground') ||
      'text-muted-foreground hover:text-foreground'
    )
  }
  return (
    <>
      {itemsSidebars.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`flex items-center gap-4 px-2.5 ${getActiveClass(item.name)}`}
        >
          <Icon name={item.icon} className="h-5 w-5" />
          {item.name}
        </Link>
      ))}
    </>
  )
}
