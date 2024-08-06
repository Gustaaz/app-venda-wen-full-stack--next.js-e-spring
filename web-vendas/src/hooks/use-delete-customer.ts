import { deleteById } from '@/actions/customer/delete-by-id'
import { useToast } from '@/components/ui'
import { useRouter } from 'next/navigation'

export function useDeleteCustomer() {
  const { toast } = useToast()
  const { replace } = useRouter()
  const deleteCustomer = async (
    idCustomer: number,
    qtdRows: number,
    page: number,
  ) => {
    try {
      await deleteById(idCustomer)

      toast({
        description: 'Produto excluido com sucesso',
        title: 'Sucesso',
        variant: 'success',
        duration: 3000,
      })

      if (qtdRows === 1) {
        if (page > 0) {
          replace(`/inicio/clientes?page=${page - 1}`)
        }
      }
    } catch (error) {
      toast({
        description: 'Erro ao excluir o produto',
        title: 'Erro',
        variant: 'destructive',
        duration: 3000,
      })
    }
  }

  return { deleteCustomer }
}
