import { dataColumnsCustomer } from '@/components/data-table-customer/data-columns-customer'
import { Customer } from '@/types/customer'
import { Page } from '@/types/page'
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

type UseDataTableCustomerProps = {
  pageCustomer: Page<Customer>
}
export function useDataTableCustomer({
  pageCustomer,
}: UseDataTableCustomerProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const { replace } = useRouter()
  const pathname = usePathname()

  const table = useReactTable({
    data: pageCustomer.content,
    columns: dataColumnsCustomer,
    onSortingChange: setSorting,
    rowCount: pageCustomer.totalElements,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    pageCount: pageCustomer.totalPages,
    manualPagination: true,
    state: {
      pagination: {
        pageIndex: pageCustomer.number,
        pageSize: pageCustomer.size,
      },
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })
  const startPage = Math.max(1, pageCustomer.number - 2)
  const endPage = Math.min(pageCustomer.totalPages, startPage + 4)
  const pagesToDisplay = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  )

  function handleSearch(value: string, searchParams: URLSearchParams) {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set('nome', value)
      params.set('page', '0')
    } else {
      params.delete('nome')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  return { table, pagesToDisplay, handleSearch }
}
