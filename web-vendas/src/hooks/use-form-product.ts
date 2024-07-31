import { getById } from '@/actions/product/get-by-id'
import { save } from '@/actions/product/save'
import { update } from '@/actions/product/update'
import { useToast } from '@/components/ui'
import { productSchema } from '@/schema/product-schema'
import { Product } from '@/types/product'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReadonlyURLSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useHookFormMask } from 'use-mask-input'

type FormProductProps = {
  searchParams: ReadonlyURLSearchParams
}
export function useFormProduct({ searchParams }: FormProductProps) {
  const { toast } = useToast()
  const id = searchParams.get('id')
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
    getValues,
  } = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      id: id ? Number(id) : undefined,
      sku: '',
      nome: '',
      descricao: '',
      preco: undefined,
      dataCadastro: '',
    },
  })
  const registerWithMask = useHookFormMask(register)

  useEffect(() => {
    if (id) {
      getById(id).then((product) => {
        if (product) {
          setValue('id', product.id)
          setValue('sku', product.sku)
          setValue('nome', product.nome)
          setValue('descricao', product.descricao)
          setValue('preco', product.preco)
          setValue('dataCadastro', product.dataCadastro)
        }
      })
    }
  }, [id])

  const onSubmit = async (data: Product) => {
    try {
      const response = getValues('id') ? await update(data) : await save(data)
      toast({
        title: getValues('id') ? 'Produto atualizado' : 'Produto criado',
        description: getValues('id')
          ? 'O novo produto foi atualizado com sucesso'
          : 'O novo produto foi criado com sucesso',
        variant: 'success',
        duration: 2000,
      })

      if (response.id) {
        setValue('id', response.id)
        setValue('dataCadastro', response.dataCadastro)
      }
    } catch (error) {
      console.log(error)
      toast({
        title: 'Erro ao salvar o produto',
        description: getValues('id')
          ? 'Ocorreu um erro ao atualizar o novo produto'
          : 'Ocorreu um erro ao salvar o novo produto',
        variant: 'destructive',
        duration: 2000,
      })
    }
  }

  const onError = () => {
    toast({
      title: 'Erro ao salvar o produto',
      description: 'Verifique os dados e tente novamente',
      variant: 'destructive',
      duration: 2000,
    })
  }

  return {
    errors,
    handleSubmit,
    registerWithMask,
    register,
    reset,
    setValue,
    getValues,
    onSubmit,
    onError,
  }
}
