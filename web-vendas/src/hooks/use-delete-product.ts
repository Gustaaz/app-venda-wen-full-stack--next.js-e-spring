import { deleteById } from '@/actions/product/delete-by-id'
import { useToast } from '@/components/ui'

export function useDeleteProduct() {
  const { toast } = useToast()
  const deleteProduct = async (idProduct: number) => {
    try {
      await deleteById(idProduct)

      toast({
        description: 'Produto excluido com sucesso',
        title: 'Sucesso',
        variant: 'success',
        duration: 3000,
      })
    } catch (error) {
      toast({
        description: 'Erro ao excluir o produto',
        title: 'Erro',
        variant: 'destructive',
        duration: 3000,
      })
    }
  }

  return { deleteProduct }
}
