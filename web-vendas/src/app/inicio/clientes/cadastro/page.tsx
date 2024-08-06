import { BackButton } from '@/components/back-button'
import { FormCustomer } from '@/components/form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'

export default function AddCustomer() {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mx-auto grid w-full flex-1 auto-rows-max gap-4 md:w-9/12 xl:w-1/2">
        <BackButton label="Controle de Clientes" />
        <div className="grid gap-4 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 md:col-span-2 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-0">
              <CardHeader>
                <CardTitle>Clientes</CardTitle>
              </CardHeader>
              <CardContent>
                <FormCustomer />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
