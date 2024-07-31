import { usePathname } from 'next/navigation'

export const useActiveMenu = () => {
  const currentPathname = usePathname()
  const lastSlashIndex = currentPathname.lastIndexOf('/')
  const currentPathnameEnd = currentPathname
    .substring(lastSlashIndex + 1)
    .toLowerCase()

  const isActive = (itemName: string): boolean => {
    return itemName.toLowerCase() === currentPathnameEnd
  }

  return {
    isActive,
  }
}
