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
    name: 'Produtos',
    href: '/inicio/produtos',
    icon: 'Package',
  },
  {
    name: 'Clientes',
    href: '/inicio/clientes',
    icon: 'Contact',
  },
  {
    name: 'Vendas',
    href: '/inicio/vendas',
    icon: 'Wallet',
  },
]
