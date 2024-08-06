import { Product } from '@/types/product'
import { ColumnDef } from '@tanstack/react-table'
import {
  Button,
  Checkbox,
  Dialog,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui'
import Link from 'next/link'
import { MoreHorizontal } from 'lucide-react'
import { DialogDeleteProduct } from '../table-product/dialog-delete-product'

export const dataColumnsProduct: ColumnDef<Product>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: 'Codigo',
    cell: ({ row }) => <div className="font-medium">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'sku',
    header: 'Sku',
    cell: ({ row }) => <div className="lowercase">{row.getValue('sku')}</div>,
  },
  {
    accessorKey: 'nome',
    header: 'Nome',
    cell: ({ row }) => <div className="lowercase">{row.getValue('nome')}</div>,
  },
  {
    accessorKey: 'descricao',
    header: 'Descrição',
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('descricao')}</div>
    ),
  },
  {
    accessorKey: 'preco',
    header: 'Preço',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('preco'))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(amount)

      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: 'dataCadastro',
    header: 'Data de Cadastro',
    cell: ({ row }) => (
      <div className="w-2 overflow-hidden truncate lowercase">
        {row.getValue('dataCadastro')}
      </div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                className="w-full"
                href={`/inicio/produtos/cadastro?id=${product.id}`}
              >
                Editar
              </Link>
            </DropdownMenuItem>
            <Dialog>
              <DialogTrigger asChild>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={(e) => e.preventDefault()}
                >
                  Deletar
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogDeleteProduct idProduct={product.id!} />
            </Dialog>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
