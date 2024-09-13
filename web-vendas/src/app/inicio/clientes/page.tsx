import Link from 'next/link'
import { PlusCircle } from 'lucide-react'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui'
import { DataTableCustomer } from '@/components/data-table-customer'
import { getAll } from '@/actions/customer/get-all'

export default async function Customers({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const selectedPage = (Number(searchParams?.page) || 0) as number
  const nameFilter = (searchParams?.nome || '') as string

  const customers = await getAll({
    cpf: '',
    nome: nameFilter.toUpperCase(),
    page: selectedPage,
    size: 10,
  })

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-4">
      <div className="grid gap-4">
        <Link href="/inicio/clientes/cadastro" className="ml-auto">
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Cadastrar Clientes
            </span>
          </Button>
        </Link>
        <Card>
          <CardHeader>
            <CardTitle>Clientes</CardTitle>
            <CardDescription>Gerencie seus clientes.</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTableCustomer pageCustomer={customers} />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
