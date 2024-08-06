'use client'
import { useForm } from 'react-hook-form'
import { Button, Input, useToast } from '../ui'
import { Customer } from '@/types/customer'
import { zodResolver } from '@hookform/resolvers/zod'
import { customerSchema } from '@/schema/customer-schema'
import { InputCPF } from '../input-mask/input-cpf'
import { InputPhone } from '../input-mask/input-phone'
import { InputDate } from '../input-mask/input-date'
import { save } from '@/actions/customer/save'
import { update } from '@/actions/customer/update'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { getById } from '@/actions/customer/get-by-id'

export function FormCustomer() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const { toast } = useToast()
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
  } = useForm<Customer>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      id: id ? Number(id) : undefined,
      email: '',
      nome: '',
      cpf: '',
      dataNascimento: '',
      dataCadastro: '',
      telefone: '',
      endereco: '',
    },
  })

  useEffect(() => {
    if (id) {
      getById(id).then((customer) => {
        if (customer) {
          setValue('id', customer.id)
          setValue('email', customer.email)
          setValue('nome', customer.nome)
          setValue('cpf', customer.cpf)
          setValue('endereco', customer.endereco)
          setValue('dataCadastro', customer.dataCadastro)
          setValue('dataNascimento', customer.dataNascimento)
          setValue('telefone', customer.telefone)
        }
      })
    }
  }, [id])

  const onSubmit = async (data: Customer) => {
    try {
      const response = getValues('id') ? await update(data) : await save(data)
      toast({
        title: getValues('id') ? 'Cliente atualizado' : 'Cliente criado',
        description: getValues('id')
          ? 'O novo cliente foi atualizado com sucesso'
          : 'O novo cliente foi criado com sucesso',
        variant: 'success',
        duration: 2000,
      })

      if (response.id) {
        setValue('id', response.id)
        setValue('dataCadastro', response.dataCadastro)
      }
    } catch (error) {
      toast({
        title: 'Erro ao salvar o cliente',
        description: getValues('id')
          ? 'Ocorreu um erro ao atualizar o novo cliente'
          : 'Ocorreu um erro ao salvar o novo cliente',
        variant: 'destructive',
        duration: 2000,
      })
    }
  }

  function ToUpcase(value: string, name: string): void {
    setValue(name as keyof Customer, value.toUpperCase())
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
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
          {...register('nome')}
          id="nome"
          label="Nome"
          autoComplete="off"
          formatter={ToUpcase}
          type="text"
          className="w-full"
          placeholder="João da Silva"
          error={errors.nome && errors.nome.message}
        />
      </div>
      <div className="grid w-full items-center gap-3 md:flex">
        <InputCPF
          {...register('cpf')}
          id="cpf"
          label="CPF"
          type="text"
          className="w-full"
          placeholder="000.000.000-00"
          error={errors.cpf && errors.cpf.message}
        />
        <InputDate
          {...register('dataNascimento')}
          id="dataNascimento"
          autoComplete="off"
          label="Data de Nascimento"
          type="text"
          className="w-full"
          placeholder="00/00/0000"
          error={errors.dataNascimento && errors.dataNascimento.message}
        />
      </div>
      <Input
        {...register('endereco')}
        label="Endereço"
        autoComplete="off"
        type="text"
        className="w-full"
        placeholder="Av. João da Silva, 123"
        error={errors.endereco && errors.endereco.message}
      />
      <div className="grid w-full items-center gap-3 md:flex">
        <Input
          {...register('email')}
          id="email"
          label="Email"
          type="text"
          autoComplete="off"
          className="w-full"
          placeholder="jpj2K@example.com"
          error={errors.email && errors.email.message}
        />
        <InputPhone
          {...register('telefone')}
          id="telefone"
          label="Telefone"
          autoComplete="off"
          type="text"
          placeholder="(00) 00000-0000"
          className="w-full"
          error={errors.telefone && errors.telefone.message}
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button
          onClick={() => reset()}
          type="button"
          variant="outline"
          size="sm"
        >
          Limpar
        </Button>

        <Button size="sm">{getValues('id') ? 'Atualizar' : 'Salvar'}</Button>
      </div>
    </form>
  )
}
