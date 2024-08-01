'use client'

import { useForm } from 'react-hook-form'
import { Button, Input } from '../ui'
import { Customer } from '@/types/customer'
import { zodResolver } from '@hookform/resolvers/zod'
import { customerSchema } from '@/schema/customer-schema'
import { InputCPF } from '../input-mask/input-cpf'
import { InputPhone } from '../input-mask/input-phone'
export function FormCustomer() {
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
    setValue,
  } = useForm<Customer>({
    resolver: zodResolver(customerSchema),
  })

  function onSubmit(data: Customer) {
    console.log(data)
  }

  function onError(error: any) {
    console.log(error)
  }

  function ToUpcase(value: string, name: string): void {
    setValue(name as keyof Customer, value.toUpperCase())
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="grid gap-4">
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

      <div className="grid w-full items-center gap-3 md:flex">
        <Input
          {...register('nome')}
          id="nome"
          label="Nome a"
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
        <Input
          {...register('dataNascimento')}
          id="dataNascimento"
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
          className="w-full"
          placeholder="jpj2K@example.com"
          error={errors.email && errors.email.message}
        />
        <InputPhone
          {...register('telefone')}
          id="telefone"
          label="Telefone"
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

        <Button size="sm">Salvar</Button>
      </div>
    </form>
  )
}
