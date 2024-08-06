'use server'
import { Customer } from '@/types/customer'
import { resourceURLCustomer } from '@/ultls/resouce-url-api'

export const getById = async (id: string): Promise<Customer> => {
  const response = await fetch(`${resourceURLCustomer}/${id}`, {
    method: 'GET',
  })

  if (!response.ok) {
    throw new Error('Ocorreu um erro inesperado')
  }

  const customerCustomer = (await response.json()) as Promise<Customer>
  return customerCustomer
}
