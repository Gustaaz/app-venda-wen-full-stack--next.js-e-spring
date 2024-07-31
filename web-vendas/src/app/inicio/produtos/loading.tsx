import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui'
import { Loader, PlusCircle } from 'lucide-react'
import Link from 'next/link'

export default function Loading() {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-4">
      <div className="grid gap-2">
        <Link href="/inicio/produtos/cadastro" className="ml-auto">
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Cadastrar Produto
            </span>
          </Button>
        </Link>
        <Card>
          <CardHeader>
            <CardTitle>Produtos</CardTitle>
            <CardDescription>Gerencie seus produtos.</CardDescription>
          </CardHeader>
          <CardContent className="grid items-center justify-center gap-2">
            <Loader className="h-6 w-6 animate-spin" />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
