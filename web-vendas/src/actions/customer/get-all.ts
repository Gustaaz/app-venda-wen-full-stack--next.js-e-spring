'use server'
import { Customer } from '@/types/customer'
import { Page } from '@/types/page'
import { resourceURLCustomer } from '@/ultls/resouce-url-api'

type GetAllProps = {
  nome: string
  cpf: string
  page: number
  size: number
}

export const getAll = async ({
  nome = '',
  cpf = '',
  page = 0,
  size = 10,
}: GetAllProps): Promise<Page<Customer>> => {
  const url = `${resourceURLCustomer}?nome=${nome}&cpf=${cpf}&page=${page}&size=${size}`
  console.log(url)
  const response = await fetch(url, {
    method: 'GET',
  })

  if (!response.ok) {
    throw new Error('Ocorreu um erro inesperado')
  }

  const customer = (await response.json()) as Promise<Page<Customer>>
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return customer
}
