'use server'
import { Customer } from '@/types/customer'
import { resourceURLCustomer } from '@/ultls/resouce-url-api'
import { revalidatePath } from 'next/cache'

export const save = async (customer: Customer): Promise<Customer> => {
  const response = await fetch(resourceURLCustomer, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customer),
  })

  if (!response.ok) {
    throw new Error('Ocorreu um erro inesperado')
  }

  const customerResponse = (await response.json()) as Promise<Customer>
  revalidatePath('/inicio/clientes')

  return customerResponse
}
