import { Product } from '@/types/product'
import {
  Dialog,
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui'
import { TableRowProduct } from './table-row-product'

type TableProductsProps = {
  products: Product[]
}
export function TableProducts({ products }: TableProductsProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Codigo</TableHead>
          <TableHead>SKU</TableHead>
          <TableHead className="hidden md:table-cell">Nome</TableHead>
          <TableHead className="hidden lg:table-cell">Descrição</TableHead>
          <TableHead className="hidden lg:table-cell">Preço</TableHead>
          <TableHead className="hidden md:table-cell">
            Data de Criação
          </TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <Dialog key={product.id}>
            <TableRowProduct product={product} />
          </Dialog>
        ))}
      </TableBody>
    </Table>
  )
}
