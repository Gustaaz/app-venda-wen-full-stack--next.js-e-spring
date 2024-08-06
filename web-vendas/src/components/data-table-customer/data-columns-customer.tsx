import { Customer } from '@/types/customer'
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
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { DialogDeleteCustomer } from './dialog-delete-customer'
import Link from 'next/link'

export const dataColumnsCustomer: ColumnDef<Customer>[] = [
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
    cell: ({ row }) => <div className="capitalize">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'nome',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },

    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('nome')}</div>
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },

    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('email')}</div>
    },
  },
  {
    accessorKey: 'cpf',
    header: 'CPF',
    cell: ({ row }) => <div className="lowercase">{row.getValue('cpf')}</div>,
  },
  {
    accessorKey: 'dataNascimento',
    header: () => <div className="">Data de Nascimento</div>,
    cell: ({ row }) => {
      return <div className="lowercase">{row.getValue('dataNascimento')}</div>
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row, table }) => {
      const customer = row.original
      const qtdRows = table.getFilteredRowModel().rows.length
      const page = table.getState().pagination.pageIndex
      console.log(page)

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
              <Link href={`/inicio/clientes/cadastro?id=${customer.id}`}>
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
              <DialogDeleteCustomer
                idCustomer={customer.id!}
                qtdRows={qtdRows}
                page={page}
              />
            </Dialog>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
