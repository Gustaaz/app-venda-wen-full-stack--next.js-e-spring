import { useDeleteProduct } from '@/hooks/use-delete-product'
import {
  Button,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui'

export function DialogDeleteProduct({ idProduct }: { idProduct: number }) {
  const { deleteProduct } = useDeleteProduct()
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Apagar produto</DialogTitle>
        <DialogDescription>
          Tem certeza que deseja apagar o produto?
        </DialogDescription>
      </DialogHeader>
      <div className="flex w-full items-center justify-end gap-3">
        <Button variant="destructive" onClick={() => deleteProduct(idProduct)}>
          Apagar
        </Button>
        <DialogClose>Cancelar</DialogClose>
      </div>
    </DialogContent>
  )
}
