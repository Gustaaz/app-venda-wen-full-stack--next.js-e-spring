'use client'
import { Customer } from '@/types/customer'
import { flexRender } from '@tanstack/react-table'
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Input,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'
import { Page } from '@/types/page'
import Link from 'next/link'
import { dataColumnsCustomer } from './data-columns-customer'
import { useDataTableCustomer } from '@/hooks/use-data-table-customer'

type DataTableCustomerProps = {
  pageCustomer: Page<Customer>
}
export function DataTableCustomer({ pageCustomer }: DataTableCustomerProps) {
  const { pagesToDisplay, table } = useDataTableCustomer({ pageCustomer })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtre por email"
          value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('email')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colunas <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={dataColumnsCustomer.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{' '}
          {table.getFilteredRowModel().rows.length} linha(s) selecionada.
        </div>
        <div className="space-x-2">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button
                  variant="ghost"
                  className="cursor-default"
                  disabled={!table.getCanPreviousPage()}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <Link
                    href={`?${new URLSearchParams({ page: (pageCustomer.number - 1).toString() })}`}
                    className="flex cursor-pointer items-center"
                  >
                    Voltar
                  </Link>
                </Button>
              </PaginationItem>
              {pagesToDisplay.map((page) => (
                <PaginationItem
                  key={page}
                  className={
                    page === pageCustomer.number + 1
                      ? 'rounded-sm bg-accent text-accent-foreground'
                      : ''
                  }
                >
                  <PaginationLink
                    href={`?${new URLSearchParams({ page: (page - 1).toString() })}`}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <Button
                  variant="ghost"
                  className="cursor-default"
                  disabled={!table.getCanNextPage()}
                >
                  <Link
                    href={`?${new URLSearchParams({ page: (pageCustomer.number + 1).toString() })}`}
                    className="flex cursor-pointer items-center"
                  >
                    Proximo
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  )
}
