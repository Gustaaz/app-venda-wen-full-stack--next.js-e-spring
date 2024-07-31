'use client'
import { useSearchParams } from 'next/navigation'
import { Button, Input, Textarea } from '../ui'
import { useFormProduct } from '@/hooks/use-form-product'

export function FormProduct() {
  const searchParams = useSearchParams()
  const {
    errors,
    handleSubmit,
    register,
    getValues,
    reset,
    onError,
    onSubmit,
    registerWithMask,
  } = useFormProduct({ searchParams })

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="grid gap-4">
      {getValues('id') && (
        <div className="grid w-full items-center gap-3 md:flex">
          <Input
            {...register('id')}
            id="id"
            disabled
            label="Codigo"
            type="text"
            className="w-full"
          />
          <Input
            {...register('dataCadastro')}
            id="dataCadastro"
            label="Data de cadastro"
            type="text"
            disabled
            className="w-full"
          />
        </div>
      )}
      <div className="grid w-full items-center gap-3 md:flex">
        <Input
          {...register('sku')}
          id="sku"
          label="SKU"
          autoComplete="off"
          type="text"
          className="w-full"
          placeholder="Digite o SKU do produto"
          error={errors.sku?.message}
        />
        <Input
          {...registerWithMask('preco', 'brl-currency', {
            rightAlign: false,
            required: true,
          })}
          id="preco"
          label="Preço"
          autoComplete="off"
          type="text"
          className="w-full"
          max={19}
          placeholder="Digite o preço do produto"
          error={errors.preco?.message}
        />
      </div>
      <Input
        {...register('nome', { required: true })}
        label="Nome"
        autoComplete="off"
        type="text"
        className="w-full"
        placeholder="Digite o nome do produto"
        error={errors.nome?.message}
      />

      <Textarea
        {...register('descricao', { required: true })}
        id="descricao"
        label="Descricão"
        autoComplete="off"
        placeholder="Digite uma descricão do produto"
        className="min-h-32"
        error={errors.descricao?.message}
      />

      <div className="ml-auto flex items-center gap-2">
        {!searchParams.get('id') && (
          <Button
            type="button"
            onClick={() => reset()}
            variant="outline"
            size="sm"
          >
            Limpar
          </Button>
        )}
        <Button size="sm">{getValues('id') ? 'Atualizar' : 'Salvar'}</Button>
      </div>
    </form>
  )
}
