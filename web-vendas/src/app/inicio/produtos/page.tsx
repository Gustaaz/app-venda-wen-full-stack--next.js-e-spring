import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { TableProducts } from "@/components/table-product";
import { getAll } from "@/actions/product/get-all";

export default async function Product() {
  const products = await getAll();

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-4">
      <div className="grid gap-4">
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
          <CardContent>
            {products.length > 0 && <TableProducts products={products} />}
            {products.length === 0 && (
              <>
                <div className="flex h-96 flex-1 items-center justify-center rounded-lg shadow-sm">
                  <div className="flex flex-col items-center gap-1 text-center">
                    <h3 className="text-2xl font-bold tracking-tight">
                      Você não possui nenhum produto
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Clique no botão abaixo para adicionar um
                    </p>
                    <Link href="/inicio/produtos/cadastro">
                      <Button className="mt-2 gap-1">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                          Cadastrar Produto
                        </span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
