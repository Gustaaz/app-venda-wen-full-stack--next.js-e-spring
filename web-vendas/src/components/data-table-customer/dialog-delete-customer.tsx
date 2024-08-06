import {
  Button,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui'
import { useDeleteCustomer } from '@/hooks/use-delete-customer'

export function DialogDeleteCustomer({
  idCustomer,
  qtdRows,
  page,
}: {
  idCustomer: number
  qtdRows: number
  page: number
}) {
  const { deleteCustomer } = useDeleteCustomer()
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Apagar cliente</DialogTitle>
        <DialogDescription>
          Tem certeza que deseja apagar o cliente?
        </DialogDescription>
      </DialogHeader>
      <div className="flex w-full items-center justify-end gap-3">
        <Button
          variant="destructive"
          onClick={() => deleteCustomer(idCustomer, qtdRows, page)}
        >
          Apagar
        </Button>
        <DialogClose>Cancelar</DialogClose>
      </div>
    </DialogContent>
  )
}
