'use client'
import { MoreHorizontal } from 'lucide-react'
import {
  TableRow,
  TableCell,
  DropdownMenu,
  DropdownMenuTrigger,
  Button,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  Dialog,
  DialogTrigger,
} from '../ui'
import { Product } from '@/types/product'
import Link from 'next/link'
import { DialogDeleteProduct } from './dialog-delete-product'

type TableRowProductProps = {
  product: Product
}

export async function TableRowProduct({ product }: TableRowProductProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{product.id}</TableCell>
      <TableCell>
        <TableCell className="font-medium">{product.sku}</TableCell>
      </TableCell>
      <TableCell className="hidden md:table-cell">{product.nome}</TableCell>
      <TableCell className="hidden overflow-hidden truncate lg:table-cell lg:w-2">
        {product.descricao}
      </TableCell>
      <TableCell className="hidden lg:table-cell">{product.preco}</TableCell>
      <TableCell className="hidden md:table-cell">
        {product.dataCadastro}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
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
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  Deletar
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogDeleteProduct idProduct={product.id!} />
            </Dialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}
