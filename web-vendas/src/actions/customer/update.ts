'use server'
import { Customer } from '@/types/customer'
import { resourceURLCustomer } from '@/ultls/resouce-url-api'
import { revalidatePath } from 'next/cache'

export const update = async (customer: Customer): Promise<Customer> => {
  const url = `${resourceURLCustomer}/${customer.id}`
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(customer),
  })

  if (!response.ok) {
    throw new Error('Unexpected error')
  }

  revalidatePath('/inicio/clientes')

  return customer
}
