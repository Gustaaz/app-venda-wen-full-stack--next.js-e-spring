import { icons } from 'lucide-react'

type ItemsSidebar = {
  name: string
  href: string
  icon: keyof typeof icons
}

export const itemsSidebars: ItemsSidebar[] = [
  {
    name: 'Inicio',
    href: '/inicio',
    icon: 'House',
  },
  {
    name: 'Agendamentos',
    href: '/inicio/produtos',
    icon: 'Package',
  },
]
