import { getAll as getAllCustomers } from '@/actions/customer/get-all'
import { getAll as getAllProducts } from '@/actions/product/get-all'
import { FormSales } from '@/components/form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'

export default async function Vendas({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const selectedPage = (Number(searchParams?.page) || 0) as number
  const nameFilter = (searchParams?.nome || '') as string

  const customers = await getAllCustomers({
    cpf: '',
    nome: nameFilter.toUpperCase(),
    page: selectedPage,
    size: 10,
  })

  const products = await getAllProducts()
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mx-auto grid w-full flex-1 auto-rows-max gap-4 md:w-9/12 xl:w-1/2">
        <div className="grid gap-4 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 md:col-span-2 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-0">
              <CardHeader>
                <CardTitle>Vendas</CardTitle>
              </CardHeader>
              <CardContent>
                <FormSales customers={customers} products={products} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
