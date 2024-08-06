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

  const customers = await getAll({
    cpf: '',
    nome: '',
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
            {customers.content.length > 0 && (
              <DataTableCustomer pageCustomer={customers} />
            )}
            {customers.content.length === 0 && (
              <div className="flex h-96 flex-1 items-center justify-center rounded-lg shadow-sm">
                <div className="flex flex-col items-center gap-1 text-center">
                  <h3 className="text-2xl font-bold tracking-tight">
                    Você não possui nenhum cliente
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Clique no botão abaixo para adicionar um
                  </p>
                  <Link href="/inicio/clientes/cadastro">
                    <Button className="mt-2 gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Cadastrar Cliente
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
